import React from 'react';
import { Player } from '@/lib/challenge';
import { ACHIEVEMENTS, getLevel } from '@/lib/gamification';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Star } from 'lucide-react';

interface GamificationProfileProps {
  player: Player;
}

export const GamificationProfile: React.FC<GamificationProfileProps> = ({ player }) => {
  const { level, currentLevelXP, nextLevelXP, progress } = getLevel(player.xp || 0);
  
  const earnedAchievements = ACHIEVEMENTS.filter(a => 
    (player.achievements || []).includes(a.id)
  );
  
  const lockedAchievements = ACHIEVEMENTS.filter(a => 
    !(player.achievements || []).includes(a.id)
  );

  return (
    <div className="space-y-6">
      {/* Level & XP Card */}
      <Card className="border-2 border-primary/10 bg-gradient-to-br from-background to-primary/5">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                Level {level}
              </CardTitle>
              <CardDescription>
                {player.xp?.toLocaleString() || 0} Total XP
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {getLevelTitle(level)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentLevelXP} XP</span>
              <span>{nextLevelXP} XP</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-center text-muted-foreground mt-1">
              {Math.round(nextLevelXP - (player.xp || 0))} XP to next level
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Achievements ({earnedAchievements.length}/{ACHIEVEMENTS.length})
        </h3>
        
        <ScrollArea className="h-[300px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Earned Achievements */}
            {earnedAchievements.map(achievement => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                earned={true} 
              />
            ))}
            
            {/* Locked Achievements */}
            {lockedAchievements.map(achievement => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                earned={false} 
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement, earned }: { achievement: any, earned: boolean }) => {
  return (
    <Card className={`border ${earned ? 'border-primary/20 bg-primary/5' : 'border-dashed opacity-60'}`}>
      <CardContent className="p-3 flex items-start gap-3">
        <div className={`text-2xl p-2 rounded-full ${earned ? 'bg-background shadow-sm' : 'bg-muted grayscale'}`}>
          {achievement.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className={`font-semibold text-sm ${earned ? '' : 'text-muted-foreground'}`}>
              {achievement.title}
            </h4>
            {earned && (
              <Badge variant="outline" className="text-[10px] px-1 h-5 border-primary/30 text-primary">
                +{achievement.xpReward} XP
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {achievement.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

function getLevelTitle(level: number): string {
  if (level < 5) return "Novice";
  if (level < 10) return "Apprentice";
  if (level < 20) return "Adept";
  if (level < 30) return "Expert";
  if (level < 50) return "Master";
  return "Legend";
}

export default GamificationProfile;
