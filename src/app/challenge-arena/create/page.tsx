'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Globe, 
  Swords, 
  Users, 
  Zap,
  Clock,
  Trophy,
  Search,
  CheckCircle2
} from 'lucide-react';
import { createChallenge, Challenge, getAllPlayers, Player } from '@/lib/challenge';
import { useToast } from '@/hooks/use-toast';

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: Calculator, color: 'text-blue-500' },
  { id: 'english', name: 'English Language', icon: BookOpen, color: 'text-green-500' },
  { id: 'science', name: 'Integrated Science', icon: FlaskConical, color: 'text-orange-500' },
  { id: 'social', name: 'Social Studies', icon: Globe, color: 'text-purple-500' },
];

const DIFFICULTIES = [
  { id: 'easy', name: 'Easy', description: 'Basic concepts, 5 questions' },
  { id: 'medium', name: 'Medium', description: 'Standard level, 10 questions' },
  { id: 'hard', name: 'Hard', description: 'Advanced problems, 15 questions' },
];

export default function CreateChallengePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    subject: '',
    difficulty: 'medium',
    type: 'quick', // quick, friend
    opponentId: '',
  });

  useEffect(() => {
    const allPlayers = getAllPlayers();
    // Filter out current user (mocked as user-1)
    setFriends(allPlayers.filter(p => p.userId !== 'user-1'));
  }, []);

  const filteredFriends = friends.filter(friend => 
    friend.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async () => {
    setLoading(true);
    try {
      // Mock current user
      const currentUser = {
        id: 'user-1',
        name: 'Kwame Asante',
        school: 'Accra Community School'
      };

      const questionCount = formData.difficulty === 'easy' ? 5 : formData.difficulty === 'medium' ? 10 : 15;
      const timeLimit = formData.difficulty === 'easy' ? 30 : formData.difficulty === 'medium' ? 45 : 60;

      // If quick match, we'd find a random opponent, but for now we'll just create it
      // If friend match, we'd need an opponent selector.
      
      let opponents: any[] = [];
      
      if (formData.type === 'friend') {
        if (!formData.opponentId) {
          toast({
            title: 'Select an Opponent',
            description: 'Please select a friend to challenge.',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
        
        const selectedFriend = friends.find(f => f.userId === formData.opponentId);
        if (selectedFriend) {
          opponents = [{
            userId: selectedFriend.userId,
            userName: selectedFriend.userName,
            school: selectedFriend.school,
            status: 'invited' as const
          }];
        }
      }

      const challenge = createChallenge({
        type: formData.type as any,
        level: 'JHS',
        subject: formData.subject,
        difficulty: formData.difficulty as any,
        questionCount,
        timeLimit,
        creatorId: currentUser.id,
        creatorName: currentUser.name,
        creatorSchool: currentUser.school,
        opponents,
        maxPlayers: 2,
      });

      toast({
        title: 'Challenge Created!',
        description: 'Get ready to battle!',
      });

      router.push(`/challenge-arena/play/${challenge.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create challenge',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Swords className="h-8 w-8 text-primary" />
          Create Challenge
        </h1>
        <p className="text-muted-foreground">Set up your battle arena</p>
      </div>

      <div className="grid gap-6">
        {/* Subject Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Choose Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SUBJECTS.map((subject) => (
                <div
                  key={subject.id}
                  className={`cursor-pointer rounded-lg border-2 p-4 hover:bg-muted/50 transition-all ${
                    formData.subject === subject.id ? 'border-primary bg-primary/5' : 'border-transparent bg-card shadow-sm'
                  }`}
                  onClick={() => setFormData({ ...formData, subject: subject.id })}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <subject.icon className={`h-8 w-8 ${subject.color}`} />
                    <span className="font-medium text-sm">{subject.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Difficulty Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. Select Difficulty</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={formData.difficulty} 
              onValueChange={(val) => setFormData({ ...formData, difficulty: val })}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {DIFFICULTIES.map((diff) => (
                <div key={diff.id}>
                  <RadioGroupItem value={diff.id} id={diff.id} className="peer sr-only" />
                  <Label
                    htmlFor={diff.id}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
                  >
                    <div className="mb-2">
                      {diff.id === 'easy' && <Zap className="h-6 w-6 text-green-500" />}
                      {diff.id === 'medium' && <Zap className="h-6 w-6 text-yellow-500" />}
                      {diff.id === 'hard' && <Zap className="h-6 w-6 text-red-500" />}
                    </div>
                    <div className="text-center">
                      <div className="font-semibold capitalize">{diff.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{diff.description}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Challenge Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3. Challenge Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`cursor-pointer rounded-lg border-2 p-4 flex items-center gap-4 transition-all ${
                  formData.type === 'quick' ? 'border-primary bg-primary/5' : 'border-muted'
                }`}
                onClick={() => setFormData({ ...formData, type: 'quick' })}
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Quick Match</h3>
                  <p className="text-sm text-muted-foreground">Play against a random opponent</p>
                </div>
              </div>

              <div
                className={`cursor-pointer rounded-lg border-2 p-4 flex items-center gap-4 transition-all ${
                  formData.type === 'friend' ? 'border-primary bg-primary/5' : 'border-muted'
                }`}
                onClick={() => setFormData({ ...formData, type: 'friend' })}
              >
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Challenge a Friend</h3>
                  <p className="text-sm text-muted-foreground">Invite a specific friend to duel</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Friend Selection */}
        {formData.type === 'friend' && (
          <Card className="animate-in fade-in slide-in-from-top-4 duration-300">
            <CardHeader>
              <CardTitle className="text-lg">4. Select Opponent</CardTitle>
              <CardDescription>Choose a friend to challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search friends..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                {filteredFriends.map((friend) => (
                  <div
                    key={friend.userId}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.opponentId === friend.userId 
                        ? 'border-primary bg-primary/5' 
                        : 'border-transparent bg-muted/50 hover:bg-muted'
                    }`}
                    onClick={() => setFormData({ ...formData, opponentId: friend.userId })}
                  >
                    <Avatar>
                      <AvatarFallback>{friend.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium truncate">{friend.userName}</p>
                      <p className="text-xs text-muted-foreground truncate">{friend.school}</p>
                    </div>
                    {formData.opponentId === friend.userId && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                ))}
                
                {filteredFriends.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No friends found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Button 
          size="lg" 
          className="w-full md:w-auto md:self-end"
          disabled={!formData.subject || loading}
          onClick={handleCreate}
        >
          {loading ? 'Creating Arena...' : 'Start Challenge'}
          {!loading && <Swords className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
