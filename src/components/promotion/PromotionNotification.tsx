'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp } from 'lucide-react';

interface PromotionNotificationProps {
  fromLevel: string;
  toLevel: string;
  subject: string;
  onDismiss?: () => void;
}

export function PromotionNotification({
  fromLevel,
  toLevel,
  subject,
  onDismiss,
}: PromotionNotificationProps) {
  const { toast } = useToast();

  useEffect(() => {
    // Show toast notification
    toast({
      title: '🎉 Level Up!',
      description: `You've been promoted from ${fromLevel} to ${toLevel} in ${subject}!`,
      duration: 8000,
    });
  }, [fromLevel, toLevel, subject, toast]);

  return (
    <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-green-600" />
              <h3 className="font-bold text-lg text-green-900 dark:text-green-100">
                Level Up!
              </h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              You've been promoted from{' '}
              <Badge variant="outline" className="mx-1">
                {fromLevel}
              </Badge>
              to{' '}
              <Badge variant="outline" className="mx-1 bg-green-100 dark:bg-green-900">
                {toLevel}
              </Badge>
              in <strong>{subject}</strong>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              You're now getting questions at the next level!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
