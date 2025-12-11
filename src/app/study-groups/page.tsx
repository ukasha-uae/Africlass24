'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Lock, Search, MessageCircle, Trophy, UserPlus, LogOut, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import CampusSelector from '@/components/CampusSelector';
import {
  getMyGroups,
  getAllGroups,
  createStudyGroup,
  joinStudyGroup,
  leaveStudyGroup,
  initializeSocialData,
  StudyGroup,
} from '@/lib/social';

export default function StudyGroupsPage() {
  const [myGroups, setMyGroups] = useState<StudyGroup[]>([]);
  const [allGroups, setAllGroups] = useState<StudyGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [educationLevel, setEducationLevel] = useState<'Primary' | 'JHS' | 'SHS'>('Primary');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    subject: '',
    isPrivate: false,
    createdBy: '',
    createdByName: '',
    educationLevel: 'JHS' as 'JHS' | 'SHS',
  });

  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    initializeSocialData();
    loadGroups();
  }, []);

  const loadGroups = () => {
    setMyGroups(getMyGroups());
    setAllGroups(getAllGroups());
  };

  const handleCreateGroup = () => {
    if (!newGroup.name.trim()) {
      toast({ title: 'Please enter a group name', variant: 'destructive' });
      return;
    }

    createStudyGroup({ ...newGroup, educationLevel });
    setShowCreateModal(false);
    setNewGroup({ name: '', description: '', subject: '', isPrivate: false, createdBy: '', createdByName: '', educationLevel: 'JHS' });
    loadGroups();
    toast({ title: 'Study group created!', description: 'Invite your classmates to join' });
  };

  const handleJoinGroup = (groupId: string, requiresCode: boolean = false) => {
    const success = joinStudyGroup(groupId, requiresCode ? joinCode : undefined);
    
    if (success) {
      setShowJoinModal(false);
      setJoinCode('');
      loadGroups();
      toast({ title: 'Joined study group!', description: 'Start collaborating with your classmates' });
    } else {
      toast({ title: 'Failed to join group', description: 'Invalid invite code or already a member', variant: 'destructive' });
    }
  };

  const handleLeaveGroup = (groupId: string) => {
    leaveStudyGroup(groupId);
    loadGroups();
    toast({ title: 'Left study group' });
  };

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({ title: 'Invite code copied!' });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredGroups = allGroups.filter(group => {
    const searchLower = searchTerm.toLowerCase();
    return (
      group.name.toLowerCase().includes(searchLower) ||
      group.description.toLowerCase().includes(searchLower) ||
      group.subject?.toLowerCase().includes(searchLower)
    );
  });

  const availableGroups = filteredGroups.filter(
    group => !myGroups.some(myGroup => myGroup.id === group.id)
  );

  // Filter groups by education level
  const levelFilteredMyGroups = myGroups.filter(
    g => !g.educationLevel || g.educationLevel === educationLevel
  );
  
  const levelFilteredAllGroups = allGroups.filter(
    g => !g.educationLevel || g.educationLevel === educationLevel
  );

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 pb-20">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold font-headline mb-2 flex items-center gap-3">
              <Users className="h-10 w-10 text-primary" />
              Study Groups
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn together with your classmates
            </p>
          </div>
          <CampusSelector onLevelChange={setEducationLevel} defaultLevel={educationLevel} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{levelFilteredMyGroups.length}</p>
                <p className="text-sm text-muted-foreground">My Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {levelFilteredMyGroups.reduce((sum, g) => sum + g.members.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{levelFilteredAllGroups.length}</p>
                <p className="text-sm text-muted-foreground">Available Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Button onClick={() => setShowCreateModal(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* My Groups */}
      {levelFilteredMyGroups.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">My Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levelFilteredMyGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        {group.isPrivate && <Lock className="h-4 w-4" />}
                        {group.name}
                      </CardTitle>
                      {group.subject && (
                        <Badge variant="secondary" className="text-xs">
                          {group.subject}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {group.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 3).map((member, i) => (
                        <Avatar key={i} className="h-8 w-8 border-2 border-background">
                          <AvatarFallback className="text-xs">
                            {member.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                          +{group.members.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {group.members.length} members
                    </span>
                  </div>
                  
                  {group.isPrivate && group.inviteCode && (
                    <div className="mb-3 p-2 bg-muted rounded flex items-center justify-between">
                      <span className="text-sm font-mono font-bold">{group.inviteCode}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyInviteCode(group.inviteCode!)}
                      >
                        {copiedCode === group.inviteCode ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/study-groups/${group.id}`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Open
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleLeaveGroup(group.id)}
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Discover Groups */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Discover Groups</h2>
        {availableGroups.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No available groups found. Create one to get started!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {group.isPrivate && <Lock className="h-4 w-4" />}
                    {group.name}
                  </CardTitle>
                  {group.subject && (
                    <Badge variant="secondary" className="text-xs w-fit">
                      {group.subject}
                    </Badge>
                  )}
                  <CardDescription className="line-clamp-2">
                    {group.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {group.members.length} members
                    </span>
                    <span className="text-xs text-muted-foreground">
                      by {group.createdByName}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      if (group.isPrivate) {
                        setSelectedGroup(group);
                        setShowJoinModal(true);
                      } else {
                        handleJoinGroup(group.id);
                      }
                    }}
                    className="w-full"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-lg my-8">
            <CardHeader>
              <CardTitle>Create Study Group</CardTitle>
              <CardDescription>Start a new group to study with classmates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Group Name *</Label>
                <Input
                  id="group-name"
                  placeholder="e.g., Math Study Squad"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="group-description">Description</Label>
                <Textarea
                  id="group-description"
                  placeholder="What's this group about?"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="group-subject">Subject (optional)</Label>
                <Input
                  id="group-subject"
                  placeholder="e.g., Mathematics"
                  value={newGroup.subject}
                  onChange={(e) => setNewGroup({ ...newGroup, subject: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="private-group">Private Group</Label>
                  <p className="text-xs text-muted-foreground">Requires invite code to join</p>
                </div>
                <Switch
                  id="private-group"
                  checked={newGroup.isPrivate}
                  onCheckedChange={(checked) => setNewGroup({ ...newGroup, isPrivate: checked })}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button onClick={handleCreateGroup} className="flex-1">
                  Create Group
                </Button>
                <Button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewGroup({ name: '', description: '', subject: '', isPrivate: false, createdBy: '', createdByName: '', educationLevel: 'JHS' });
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Join Private Group Modal */}
      {showJoinModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Join {selectedGroup.name}</CardTitle>
              <CardDescription>Enter the invite code to join this private group</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite-code">Invite Code</Label>
                <Input
                  id="invite-code"
                  placeholder="Enter 6-character code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  maxLength={6}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleJoinGroup(selectedGroup.id, true)}
                  className="flex-1"
                  disabled={joinCode.length !== 6}
                >
                  Join Group
                </Button>
                <Button
                  onClick={() => {
                    setShowJoinModal(false);
                    setSelectedGroup(null);
                    setJoinCode('');
                  }}
                  variant="outline"
                  className="flex-1"
                >
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
