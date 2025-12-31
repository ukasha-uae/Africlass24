'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Coins, 
  Sparkles, 
  Gift,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { COIN_PACKAGES_GHS, processCoinPurchase, formatGHS } from '@/lib/payments';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase/provider';
import { getPlayerProfile, createOrUpdatePlayer } from '@/lib/challenge';

interface CoinStoreProps {
  open: boolean;
  onClose: () => void;
  onPurchaseComplete?: () => void;
}

export default function CoinStore({ open, onClose, onPurchaseComplete }: CoinStoreProps) {
  const { user } = useFirebase();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'payment'>('select');

  const userId = user?.uid || 'test-user-1';
  const player = getPlayerProfile(userId);
  const currentCoins = player?.coins || 0;

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast({
        title: 'Select a Package',
        description: 'Please select a coin package to purchase',
        variant: 'destructive',
      });
      return;
    }

    if (!phoneNumber.trim()) {
      toast({
        title: 'Phone Number Required',
        description: 'Please enter your MTN Mobile Money number',
        variant: 'destructive',
      });
      return;
    }

    // Validate MTN number
    const mtnPrefixes = ['024', '054', '055', '059'];
    const phonePrefix = phoneNumber.substring(0, 3);
    
    if (!mtnPrefixes.includes(phonePrefix) || phoneNumber.length !== 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'MTN Mobile Money number must start with 024, 054, 055, or 059 and be 10 digits',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setStep('payment');

    try {
      const response = await processCoinPurchase(userId, selectedPackage, phoneNumber);
      
      if (response.status === 'processing' || response.status === 'completed') {
        // For demo: Auto-add coins after payment
        // In production, wait for webhook confirmation
        setTimeout(() => {
          const package_ = COIN_PACKAGES_GHS.find(p => p.packageId === selectedPackage);
          if (package_ && player) {
            const totalCoins = package_.coins + (package_.bonus || 0);
            // Update player coins directly
            const updatedPlayer = createOrUpdatePlayer({
              userId: player.userId,
              coins: (player.coins || 0) + totalCoins,
            });
            
            toast({
              title: 'Coins Added! 🎉',
              description: `You received ${totalCoins} coins (${package_.coins} + ${package_.bonus || 0} bonus)`,
            });
            
            setIsProcessing(false);
            onPurchaseComplete?.();
            onClose();
            setStep('select');
            setSelectedPackage('');
            setPhoneNumber('');
          }
        }, 2000);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error: any) {
      toast({
        title: 'Payment Failed',
        description: error.message || 'Unable to process payment. Please try again.',
        variant: 'destructive',
      });
      setIsProcessing(false);
      setStep('select');
    }
  };

  const selectedPackageData = COIN_PACKAGES_GHS.find(p => p.packageId === selectedPackage);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-2">
            <Coins className="h-8 w-8 text-yellow-500" />
            Coin Store
          </DialogTitle>
          <DialogDescription className="text-base">
            Purchase coins to unlock power-ups and premium features
          </DialogDescription>
        </DialogHeader>

        {/* Current Balance */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border-2 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-yellow-600" />
              <span className="font-semibold">Your Balance</span>
            </div>
            <span className="text-2xl font-bold text-yellow-600">{currentCoins.toLocaleString()} coins</span>
          </div>
        </div>

        {step === 'select' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COIN_PACKAGES_GHS.map((pkg) => (
                <Card
                  key={pkg.packageId}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedPackage === pkg.packageId
                      ? 'border-2 border-primary bg-gradient-to-br from-primary/10 to-yellow-500/10'
                      : 'border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedPackage(pkg.packageId)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      {pkg.bonus && pkg.bonus > 0 && (
                        <Badge variant="default" className="bg-green-500">
                          +{pkg.bonus} bonus
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{pkg.coins.toLocaleString()}</span>
                        <span className="text-muted-foreground">coins</span>
                      </div>
                      {pkg.bonus && pkg.bonus > 0 && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <Gift className="h-4 w-4" />
                          <span>+{pkg.bonus} bonus coins</span>
                        </div>
                      )}
                      <div className="text-2xl font-bold text-primary mt-2">
                        {formatGHS(pkg.price)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedPackage && (
              <Button
                onClick={() => setStep('payment')}
                className="w-full h-12 text-lg bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700"
              >
                Continue to Payment
              </Button>
            )}
          </div>
        )}

        {step === 'payment' && selectedPackageData && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Payment via MTN Mobile Money
                </CardTitle>
                <CardDescription>
                  You will receive a payment prompt on your phone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Selected Package</Label>
                  <div className="mt-1 p-3 rounded-lg bg-white dark:bg-gray-800 border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{selectedPackageData.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedPackageData.coins.toLocaleString()} coins
                          {selectedPackageData.bonus && selectedPackageData.bonus > 0 && (
                            <span className="text-green-600"> + {selectedPackageData.bonus} bonus</span>
                          )}
                        </p>
                      </div>
                      <span className="text-xl font-bold text-green-600">
                        {formatGHS(selectedPackageData.price)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">MTN Mobile Money Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0241234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="mt-1"
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your 10-digit MTN number (starts with 024, 054, 055, or 059)
                  </p>
                </div>

                {isProcessing && (
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <div>
                        <p className="font-semibold text-sm">Processing Payment...</p>
                        <p className="text-xs text-muted-foreground">
                          Please approve the payment on your phone
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep('select');
                      setIsProcessing(false);
                    }}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePurchase}
                    disabled={isProcessing || !phoneNumber.trim()}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay {formatGHS(selectedPackageData.price)}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

