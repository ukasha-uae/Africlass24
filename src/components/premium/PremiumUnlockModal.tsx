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
  Crown, 
  Lock, 
  CheckCircle2, 
  Zap, 
  Trophy, 
  School, 
  Target,
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { SUBSCRIPTION_PACKAGES_GHS, processSubscription, formatGHS } from '@/lib/payments';
import { PREMIUM_FEATURES } from '@/lib/monetization';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase/provider';
import { addSubscription } from '@/lib/monetization';

interface PremiumUnlockModalProps {
  open: boolean;
  onClose: () => void;
  feature?: string;
  onSuccess?: () => void;
}

export default function PremiumUnlockModal({ 
  open, 
  onClose, 
  feature,
  onSuccess 
}: PremiumUnlockModalProps) {
  const { user } = useFirebase();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string>('premium_monthly');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'payment'>('select');

  const userId = user?.uid || 'test-user-1';

  const handlePurchase = async () => {
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
      const response = await processSubscription(userId, selectedPackage, phoneNumber);
      
      if (response.status === 'processing' || response.status === 'completed') {
        // For demo: Auto-activate premium after payment
        // In production, wait for webhook confirmation
        setTimeout(() => {
          // Get duration from selected package
          const packageData = SUBSCRIPTION_PACKAGES_GHS.find(p => p.packageId === selectedPackage);
          const duration = packageData?.duration || 'monthly';
          
          addSubscription(userId, selectedPackage, duration);
          
          toast({
            title: 'Premium Activated! 🎉',
            description: 'Your premium subscription is now active. Enjoy all premium features!',
          });
          
          setIsProcessing(false);
          onSuccess?.();
          onClose();
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

  const selectedPackageData = SUBSCRIPTION_PACKAGES_GHS.find(p => p.packageId === selectedPackage);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            Unlock Premium Features
          </DialogTitle>
          <DialogDescription className="text-base">
            Get access to all premium game modes and exclusive benefits
          </DialogDescription>
        </DialogHeader>

        {step === 'select' && (
          <div className="space-y-6">
            {/* Premium Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(PREMIUM_FEATURES).slice(0, 6).map(([key, feature]) => (
                <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/50">
                  <span className="text-2xl">{feature.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{feature.name}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              ))}
            </div>

            {/* Subscription Packages */}
            <div className="space-y-3">
              <h3 className="font-bold text-lg">Choose Your Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUBSCRIPTION_PACKAGES_GHS.map((pkg) => (
                  <Card
                    key={pkg.packageId}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedPackage === pkg.packageId
                        ? 'border-2 border-primary bg-gradient-to-br from-primary/10 to-purple-500/10'
                        : 'border'
                    }`}
                    onClick={() => setSelectedPackage(pkg.packageId)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        {pkg.savings && (
                          <Badge variant="default" className="bg-green-500">
                            {pkg.savings}
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{pkg.duration === 'monthly' ? 'Billed monthly' : 'Billed annually'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">
                        {formatGHS(pkg.price)}
                        {pkg.duration === 'monthly' && <span className="text-lg text-muted-foreground">/month</span>}
                      </div>
                      {pkg.duration === 'annual' && (
                        <p className="text-sm text-muted-foreground">
                          {formatGHS(pkg.price / 12)}/month
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStep('payment')}
              className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Continue to Payment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
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
                  <Label htmlFor="package">Selected Package</Label>
                  <div className="mt-1 p-3 rounded-lg bg-white dark:bg-gray-800 border">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{selectedPackageData?.name}</span>
                      <span className="text-xl font-bold text-green-600">
                        {selectedPackageData && formatGHS(selectedPackageData.price)}
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
                        Pay {selectedPackageData && formatGHS(selectedPackageData.price)}
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

