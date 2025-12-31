'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Crown, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { getUserSubscription, isPremiumUser, updateSubscription } from '@/lib/monetization';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionManagementProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  onRenew?: () => void;
}

export default function SubscriptionManagement({ 
  open, 
  onClose, 
  userId,
  onRenew 
}: SubscriptionManagementProps) {
  const { toast } = useToast();
  const [subscription, setSubscription] = useState(getUserSubscription(userId));
  const [isPremium, setIsPremium] = useState(isPremiumUser(userId));

  useEffect(() => {
    if (open) {
      const sub = getUserSubscription(userId);
      setSubscription(sub);
      setIsPremium(isPremiumUser(userId));
    }
  }, [open, userId]);

  const handleCancelSubscription = () => {
    if (!subscription) return;
    
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      updateSubscription(userId, subscription.planId || '', false);
      setSubscription(null);
      setIsPremium(false);
      
      toast({
        title: 'Subscription Cancelled',
        description: 'Your subscription will remain active until the end of the billing period.',
      });
    }
  };

  const getDaysRemaining = () => {
    if (!subscription?.endDate) return null;
    const end = new Date(subscription.endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-orange-950">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
            <Crown className="h-6 w-6 text-amber-600" />
            Subscription Management
          </DialogTitle>
          <DialogDescription>
            Manage your premium subscription
          </DialogDescription>
        </DialogHeader>

        {!isPremium || !subscription ? (
          <Card className="p-6 text-center border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-amber-600" />
            <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
            <p className="text-muted-foreground mb-4">
              You don't have an active premium subscription. Subscribe to unlock all premium features!
            </p>
            {onRenew && (
              <Button 
                onClick={() => {
                  onClose();
                  onRenew();
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                <Crown className="h-4 w-4 mr-2" />
                Subscribe Now
              </Button>
            )}
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Subscription Status */}
            <Card className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-300 dark:border-amber-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-5 w-5 text-amber-600" />
                      <h3 className="text-xl font-bold">Premium {subscription.planId?.includes('annual') ? 'Annual' : 'Monthly'}</h3>
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Started: {format(new Date(subscription.startDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                {subscription.endDate && (
                  <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-semibold">Renews on:</span>
                      </div>
                      <span className="text-sm font-bold">
                        {format(new Date(subscription.endDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {daysRemaining !== null && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {daysRemaining > 0 
                          ? `${daysRemaining} days remaining`
                          : 'Expired'}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Active Features
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {subscription.features.slice(0, 6).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span className="text-xs">{feature.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                  {subscription.features.length > 6 && (
                    <div className="text-xs text-muted-foreground col-span-2">
                      +{subscription.features.length - 6} more features
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-2">
              {onRenew && (
                <Button 
                  onClick={() => {
                    onClose();
                    onRenew();
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  Renew Subscription
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={handleCancelSubscription}
                className="flex-1"
              >
                Cancel Subscription
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

