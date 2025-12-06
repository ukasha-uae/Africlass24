'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, TrendingUp, Calendar, ArrowLeft, UserPlus, 
  UserMinus, Mail, Phone, Award, Clock, BarChart3 
} from 'lucide-react';
import Link from 'next/link';
import {
  getClassById,
  addStudentToClass,
  removeStudentFromClass,
  ClassStudent,
} from '@/lib/teacher';

export default function ClassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params?.classId as string;
  const [classRoom, setClassRoom] = useState<any>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentId: '',
    studentName: '',
    studentEmail: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    if (classId) {
      loadClass();
    }
  }, [classId]);

  const loadClass = () => {
    const data = getClassById(classId);
    if (!data) {
      router.push('/teacher/dashboard');
      return;
    }
    setClassRoom(data);
  };

  const handleAddStudent = () => {
    if (!newStudent.studentName.trim() || !newStudent.studentId.trim()) {
      toast({ title: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    const student: ClassStudent = {
      studentId: newStudent.studentId,
      studentName: newStudent.studentName,
      studentEmail: newStudent.studentEmail,
      enrolledAt: new Date().toISOString(),
      attendance: 0,
      averageScore: 0,
      lessonsCompleted: 0,
      quizzesTaken: 0,
      lastActive: new Date().toISOString(),
    };

    const success = addStudentToClass(classId, student);
    if (success) {
      toast({ title: 'Student added successfully!' });
      setShowAddStudent(false);
      setNewStudent({ studentId: '', studentName: '', studentEmail: '' });
      loadClass();
    } else {
      toast({ title: 'Student already enrolled', variant: 'destructive' });
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    if (confirm('Remove this student from the class?')) {
      removeStudentFromClass(classId, studentId);
      toast({ title: 'Student removed' });
      loadClass();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!classRoom) return null;

  const avgScore = classRoom.students.length > 0
    ? Math.round(classRoom.students.reduce((sum: number, s: any) => sum + s.averageScore, 0) / classRoom.students.length)
    : 0;
  
  const avgAttendance = classRoom.students.length > 0
    ? Math.round(classRoom.students.reduce((sum: number, s: any) => sum + s.attendance, 0) / classRoom.students.length)
    : 0;

  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 lg:p-8 pb-20">
      {/* Header */}
      <Link href="/teacher/dashboard">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{classRoom.name}</h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{classRoom.subject}</Badge>
          <Badge variant="outline">{classRoom.grade}</Badge>
          <Badge>{classRoom.students.length} Students</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{classRoom.students.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{avgScore}%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{avgAttendance}%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{classRoom.schedule.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Classes/Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Student List</h2>
            <Button onClick={() => setShowAddStudent(!showAddStudent)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>

          {showAddStudent && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Student</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Student ID *</label>
                  <Input
                    placeholder="e.g., STU2024001"
                    value={newStudent.studentId}
                    onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input
                    placeholder="e.g., Kwame Asante"
                    value={newStudent.studentName}
                    onChange={(e) => setNewStudent({...newStudent, studentName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email (Optional)</label>
                  <Input
                    type="email"
                    placeholder="student@school.edu.gh"
                    value={newStudent.studentEmail}
                    onChange={(e) => setNewStudent({...newStudent, studentEmail: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddStudent} className="flex-1">Add Student</Button>
                  <Button onClick={() => setShowAddStudent(false)} variant="outline" className="flex-1">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {classRoom.students.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No students enrolled yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classRoom.students.map((student: any) => (
                <Card key={student.studentId} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{student.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{student.studentName}</h3>
                          <p className="text-xs text-muted-foreground">{student.studentId}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStudent(student.studentId)}
                      >
                        <UserMinus className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Score:</span>
                        <span className={`font-semibold ${getPerformanceColor(student.averageScore)}`}>
                          {student.averageScore}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Attendance:</span>
                        <span className="font-semibold">{student.attendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lessons:</span>
                        <span className="font-semibold">{student.lessonsCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quizzes:</span>
                        <span className="font-semibold">{student.quizzesTaken}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                      Last active: {formatDate(student.lastActive)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>Weekly class timings</CardDescription>
            </CardHeader>
            <CardContent>
              {classRoom.schedule.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No schedule configured
                </p>
              ) : (
                <div className="space-y-3">
                  {classRoom.schedule.map((slot: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold">{slot.day}</p>
                          <p className="text-sm text-muted-foreground">{slot.time}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{classRoom.subject}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {classRoom.students.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No data yet</p>
                ) : (
                  <div className="space-y-4">
                    {['Excellent (80-100%)', 'Good (60-79%)', 'Fair (40-59%)', 'Poor (0-39%)'].map((range, idx) => {
                      const [min, max] = idx === 0 ? [80, 100] : idx === 1 ? [60, 79] : idx === 2 ? [40, 59] : [0, 39];
                      const count = classRoom.students.filter((s: any) => 
                        s.averageScore >= min && s.averageScore <= max
                      ).length;
                      const percentage = (count / classRoom.students.length) * 100;
                      
                      return (
                        <div key={idx}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">{range}</span>
                            <span className="text-sm font-semibold">{count} students</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-blue-500' : 
                                idx === 2 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {classRoom.students.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No data yet</p>
                ) : (
                  <div className="space-y-3">
                    {classRoom.students
                      .sort((a: any, b: any) => b.averageScore - a.averageScore)
                      .slice(0, 5)
                      .map((student: any, idx: number) => (
                        <div key={student.studentId} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                            {idx + 1}
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{student.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold">{student.studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              {student.lessonsCompleted} lessons • {student.quizzesTaken} quizzes
                            </p>
                          </div>
                          <Badge className={getPerformanceColor(student.averageScore)}>
                            {student.averageScore}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
