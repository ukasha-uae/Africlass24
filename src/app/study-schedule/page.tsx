'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Target, BookOpen, Trophy, Plus, Trash2, Edit2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface StudySession {
  id: string;
  day: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  subject?: string;
  enabled: boolean;
}

interface StudyGoals {
  weeklyLessons: number;
  weeklyQuizzes: number;
  dailyMinutes: number;
  streakGoal: number;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_ABBREV = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function StudySchedulePage() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [goals, setGoals] = useState<StudyGoals>({
    weeklyLessons: 5,
    weeklyQuizzes: 3,
    dailyMinutes: 30,
    streakGoal: 7,
  });
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const { toast } = useToast();

  useEffect(() => {
    // Load from localStorage
    const savedSessions = localStorage.getItem('studySessions');
    const savedGoals = localStorage.getItem('studyGoals');
    
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const saveSessions = (newSessions: StudySession[]) => {
    setSessions(newSessions);
    localStorage.setItem('studySessions', JSON.stringify(newSessions));
  };

  const saveGoals = (newGoals: StudyGoals) => {
    setGoals(newGoals);
    localStorage.setItem('studyGoals', JSON.stringify(newGoals));
  };

  const addSession = () => {
    const newSession: StudySession = {
      id: `session-${Date.now()}`,
      day: selectedDay,
      startTime: '18:00',
      endTime: '19:00',
      enabled: true,
    };
    setEditingSession(newSession);
  };

  const saveSession = () => {
    if (!editingSession) return;

    const existing = sessions.find(s => s.id === editingSession.id);
    if (existing) {
      saveSessions(sessions.map(s => s.id === editingSession.id ? editingSession : s));
    } else {
      saveSessions([...sessions, editingSession]);
    }
    
    setEditingSession(null);
    toast({ title: 'Study session saved!' });
  };

  const deleteSession = (id: string) => {
    saveSessions(sessions.filter(s => s.id !== id));
    toast({ title: 'Study session deleted' });
  };

  const toggleSession = (id: string) => {
    saveSessions(sessions.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const getDaySessions = (day: number) => {
    return sessions.filter(s => s.day === day).sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );
  };

  const getTotalWeeklyHours = () => {
    return sessions
      .filter(s => s.enabled)
      .reduce((total, session) => {
        const [startHour, startMin] = session.startTime.split(':').map(Number);
        const [endHour, endMin] = session.endTime.split(':').map(Number);
        const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
        return total + duration;
      }, 0) / 60;
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline mb-2 flex items-center gap-3">
          <Calendar className="h-10 w-10 text-primary" />
          Study Schedule & Goals
        </h1>
        <p className="text-lg text-muted-foreground">
          Plan your study time and set learning goals
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{getTotalWeeklyHours().toFixed(1)}h</p>
                <p className="text-sm text-muted-foreground">Weekly Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{sessions.filter(s => s.enabled).length}</p>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{goals.weeklyLessons}</p>
                <p className="text-sm text-muted-foreground">Weekly Lessons</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{goals.streakGoal}</p>
                <p className="text-sm text-muted-foreground">Streak Goal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule
              </div>
              <Button onClick={addSession} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Session
              </Button>
            </CardTitle>
            <CardDescription>
              Click on a day to add or manage study sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Day Selector */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {DAYS.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={cn(
                    'p-3 rounded-lg text-center transition-all',
                    'hover:bg-muted',
                    selectedDay === index && 'bg-primary text-primary-foreground'
                  )}
                >
                  <div className="text-xs font-medium">{DAY_ABBREV[index]}</div>
                  <div className="text-lg font-bold mt-1">
                    {getDaySessions(index).filter(s => s.enabled).length}
                  </div>
                </button>
              ))}
            </div>

            {/* Sessions for Selected Day */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg mb-3">{DAYS[selectedDay]}</h3>
              
              {getDaySessions(selectedDay).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No study sessions scheduled for {DAYS[selectedDay]}</p>
                  <Button onClick={addSession} variant="outline" className="mt-3" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                  </Button>
                </div>
              ) : (
                getDaySessions(selectedDay).map((session) => (
                  <Card key={session.id} className={cn(
                    'transition-all',
                    !session.enabled && 'opacity-50'
                  )}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={session.enabled}
                            onCheckedChange={() => toggleSession(session.id)}
                          />
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {new Date(`2000-01-01T${session.startTime}`).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })} - {new Date(`2000-01-01T${session.endTime}`).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                            {session.subject && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                {session.subject}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSession(session)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSession(session.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Study Goals */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Study Goals
              </CardTitle>
              <CardDescription>
                Set your weekly learning targets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weekly-lessons">Weekly Lessons</Label>
                <Input
                  id="weekly-lessons"
                  type="number"
                  min="1"
                  max="50"
                  value={goals.weeklyLessons}
                  onChange={(e) => saveGoals({ ...goals, weeklyLessons: parseInt(e.target.value) || 1 })}
                />
                <p className="text-xs text-muted-foreground">
                  Complete this many lessons per week
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekly-quizzes">Weekly Quizzes</Label>
                <Input
                  id="weekly-quizzes"
                  type="number"
                  min="1"
                  max="30"
                  value={goals.weeklyQuizzes}
                  onChange={(e) => saveGoals({ ...goals, weeklyQuizzes: parseInt(e.target.value) || 1 })}
                />
                <p className="text-xs text-muted-foreground">
                  Take this many quizzes per week
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="daily-minutes">Daily Study Time (minutes)</Label>
                <Input
                  id="daily-minutes"
                  type="number"
                  min="10"
                  max="300"
                  step="5"
                  value={goals.dailyMinutes}
                  onChange={(e) => saveGoals({ ...goals, dailyMinutes: parseInt(e.target.value) || 10 })}
                />
                <p className="text-xs text-muted-foreground">
                  Target: {Math.floor(goals.dailyMinutes / 60)}h {goals.dailyMinutes % 60}m per day
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="streak-goal">Streak Goal (days)</Label>
                <Input
                  id="streak-goal"
                  type="number"
                  min="3"
                  max="365"
                  value={goals.streakGoal}
                  onChange={(e) => saveGoals({ ...goals, streakGoal: parseInt(e.target.value) || 3 })}
                />
                <p className="text-xs text-muted-foreground">
                  Maintain a {goals.streakGoal}-day study streak
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Study Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>📅 Schedule sessions at consistent times</p>
              <p>⏰ Study when you're most alert</p>
              <p>🎯 Start with achievable goals</p>
              <p>🔥 Maintain daily streaks for best results</p>
              <p>📚 Mix different subjects throughout the week</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Session Dialog */}
      {editingSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>
                {sessions.find(s => s.id === editingSession.id) ? 'Edit' : 'Add'} Study Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Day</Label>
                <select
                  value={editingSession.day}
                  onChange={(e) => setEditingSession({ ...editingSession, day: parseInt(e.target.value) })}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  {DAYS.map((day, index) => (
                    <option key={index} value={index}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={editingSession.startTime}
                    onChange={(e) => setEditingSession({ ...editingSession, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={editingSession.endTime}
                    onChange={(e) => setEditingSession({ ...editingSession, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subject (optional)</Label>
                <Input
                  placeholder="e.g., Mathematics"
                  value={editingSession.subject || ''}
                  onChange={(e) => setEditingSession({ ...editingSession, subject: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={saveSession} className="flex-1">
                  Save
                </Button>
                <Button onClick={() => setEditingSession(null)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
