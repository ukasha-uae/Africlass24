'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle2 } from 'lucide-react';
import type { PromotionProgress as PromotionProgressType } from '@/lib/challenge';

interface PromotionProgressProps {
  progress: PromotionProgressType;
  subject: string;
}

export function PromotionProgress({ progress, subject }: PromotionProgressProps) {
  const challengesRemaining = Math.max(0, progress.challengesRequired - progress.challengesCompleted);
  const accuracyPercentage = (progress.currentAccuracy * 100).toFixed(1);
  const accuracyRequiredPercentage = (progress.accuracyRequired * 100).toFixed(0);

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          Progress to {progress.nextLevel}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Overall Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Overall Progress
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {Math.round(progress.progressPercentage)}%
            </span>
          </div>
          <Progress value={progress.progressPercentage} className="h-2" />
        </div>

        {/* Challenges Progress */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Challenges Completed
            </span>
            <div className="flex items-center gap-2">
              {progress.challengesCompleted >= progress.challengesRequired ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : null}
              <span className="text-xs font-semibold">
                {progress.challengesCompleted} / {progress.challengesRequired}
              </span>
            </div>
          </div>
          {challengesRemaining > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {challengesRemaining} more challenge{challengesRemaining > 1 ? 's' : ''} needed
            </p>
          )}
        </div>

        {/* Accuracy Progress */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Accuracy
            </span>
            <div className="flex items-center gap-2">
              {progress.currentAccuracy >= progress.accuracyRequired ? (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              ) : null}
              <span className="text-xs font-semibold">
                {accuracyPercentage}% / {accuracyRequiredPercentage}%
              </span>
            </div>
          </div>
          {progress.currentAccuracy < progress.accuracyRequired && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Need {((progress.accuracyRequired - progress.currentAccuracy) * 100).toFixed(1)}% more accuracy
            </p>
          )}
        </div>

        {/* Status Badge */}
        {progress.canPromote && (
          <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
            <Badge className="w-full justify-center bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Ready to Level Up!
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
