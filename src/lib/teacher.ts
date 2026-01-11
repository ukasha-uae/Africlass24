// Teacher Portal - Data Management

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subjects: string[];
  school: string;
  classes: string[]; // Class IDs
  avatar?: string;
  joinedAt: string;
  stats: {
    totalStudents: number;
    totalClasses: number;
    assignmentsCreated: number;
    averageClassPerformance: number;
  };
}

export interface ClassRoom {
  id: string;
  name: string;
  subject: string;
  grade: string; // JHS 1, JHS 2, JHS 3
  teacherId: string;
  teacherName: string;
  students: ClassStudent[];
  schedule: {
    day: string;
    time: string;
  }[];
  createdAt: string;
}

export interface ClassStudent {
  studentId: string;
  studentName: string;
  studentEmail?: string;
  enrolledAt: string;
  attendance: number; // percentage
  averageScore: number;
  lessonsCompleted: number;
  quizzesTaken: number;
  lastActive: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  classId: string;
  className: string;
  teacherId: string;
  type: 'quiz' | 'homework' | 'project' | 'reading';
  questions: AssignmentQuestion[];
  dueDate: string;
  totalPoints: number;
  createdAt: string;
  submissions: Submission[];
  status: 'draft' | 'published' | 'closed';
}

export interface AssignmentQuestion {
  id: string;
  type: 'mcq' | 'shortAnswer' | 'essay' | 'fillblank';
  question: string;
  options?: string[];
  answer?: string;
  points: number;
  explanation?: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  answers: SubmissionAnswer[];
  submittedAt: string;
  score?: number;
  feedback?: string;
  graded: boolean;
}

export interface SubmissionAnswer {
  questionId: string;
  answer: string;
  isCorrect?: boolean;
  pointsEarned?: number;
}

export interface Announcement {
  id: string;
  teacherId: string;
  teacherName: string;
  classId?: string; // If null, send to all classes
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  readBy: string[]; // student IDs who have read
}

export interface TeacherResource {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  type: 'lesson-plan' | 'worksheet' | 'assessment' | 'presentation';
  fileUrl?: string;
  content?: string;
  uploadedBy: string;
  uploadedByName: string;
  downloads: number;
  rating: number;
  reviews: ResourceReview[];
  createdAt: string;
}

export interface ResourceReview {
  id: string;
  teacherId: string;
  teacherName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Teacher Functions

export const getTeacherProfile = (): Teacher | null => {
  if (typeof window === 'undefined') return null;
  const teacherData = localStorage.getItem('teacherProfile');
  return teacherData ? JSON.parse(teacherData) : null;
};

export const saveTeacherProfile = (teacher: Teacher): void => {
  localStorage.setItem('teacherProfile', JSON.stringify(teacher));
};

export const getTeacherClasses = (): ClassRoom[] => {
  if (typeof window === 'undefined') return [];
  const classes = localStorage.getItem('teacherClasses');
  return classes ? JSON.parse(classes) : [];
};

export const createClass = (classData: Omit<ClassRoom, 'id' | 'createdAt'>): ClassRoom => {
  const classes = getTeacherClasses();
  const newClass: ClassRoom = {
    ...classData,
    id: `class-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  classes.push(newClass);
  localStorage.setItem('teacherClasses', JSON.stringify(classes));
  return newClass;
};

export const getClassById = (classId: string): ClassRoom | null => {
  const classes = getTeacherClasses();
  return classes.find(c => c.id === classId) || null;
};

export const addStudentToClass = (classId: string, student: ClassStudent): boolean => {
  const classes = getTeacherClasses();
  const classIndex = classes.findIndex(c => c.id === classId);
  
  if (classIndex === -1) return false;
  
  // Check if student already enrolled
  if (classes[classIndex].students.some(s => s.studentId === student.studentId)) {
    return false;
  }
  
  classes[classIndex].students.push(student);
  localStorage.setItem('teacherClasses', JSON.stringify(classes));
  return true;
};

export const removeStudentFromClass = (classId: string, studentId: string): boolean => {
  const classes = getTeacherClasses();
  const classIndex = classes.findIndex(c => c.id === classId);
  
  if (classIndex === -1) return false;
  
  classes[classIndex].students = classes[classIndex].students.filter(
    s => s.studentId !== studentId
  );
  localStorage.setItem('teacherClasses', JSON.stringify(classes));
  return true;
};

// Assignments

export const getTeacherAssignments = (): Assignment[] => {
  if (typeof window === 'undefined') return [];
  const assignments = localStorage.getItem('teacherAssignments');
  return assignments ? JSON.parse(assignments) : [];
};

export const createAssignment = (assignment: Omit<Assignment, 'id' | 'createdAt' | 'submissions'>): Assignment => {
  const assignments = getTeacherAssignments();
  const newAssignment: Assignment = {
    ...assignment,
    id: `assignment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    submissions: [],
  };
  assignments.push(newAssignment);
  localStorage.setItem('teacherAssignments', JSON.stringify(assignments));
  return newAssignment;
};

export const getAssignmentById = (assignmentId: string): Assignment | null => {
  const assignments = getTeacherAssignments();
  return assignments.find(a => a.id === assignmentId) || null;
};

export const updateAssignmentStatus = (assignmentId: string, status: Assignment['status']): void => {
  const assignments = getTeacherAssignments();
  const index = assignments.findIndex(a => a.id === assignmentId);
  if (index > -1) {
    assignments[index].status = status;
    localStorage.setItem('teacherAssignments', JSON.stringify(assignments));
  }
};

export const submitAssignment = (submission: Omit<Submission, 'id'>): Submission => {
  const assignments = getTeacherAssignments();
  const assignmentIndex = assignments.findIndex(a => a.id === submission.assignmentId);
  
  if (assignmentIndex === -1) throw new Error('Assignment not found');
  
  const newSubmission: Submission = {
    ...submission,
    id: `submission-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  
  assignments[assignmentIndex].submissions.push(newSubmission);
  localStorage.setItem('teacherAssignments', JSON.stringify(assignments));
  return newSubmission;
};

export const gradeSubmission = (
  assignmentId: string,
  submissionId: string,
  score: number,
  feedback: string
): void => {
  const assignments = getTeacherAssignments();
  const assignmentIndex = assignments.findIndex(a => a.id === assignmentId);
  
  if (assignmentIndex === -1) return;
  
  const submissionIndex = assignments[assignmentIndex].submissions.findIndex(
    s => s.id === submissionId
  );
  
  if (submissionIndex > -1) {
    assignments[assignmentIndex].submissions[submissionIndex].score = score;
    assignments[assignmentIndex].submissions[submissionIndex].feedback = feedback;
    assignments[assignmentIndex].submissions[submissionIndex].graded = true;
    localStorage.setItem('teacherAssignments', JSON.stringify(assignments));
  }
};

// Announcements

export const getAnnouncements = (): Announcement[] => {
  if (typeof window === 'undefined') return [];
  const announcements = localStorage.getItem('teacherAnnouncements');
  return announcements ? JSON.parse(announcements) : [];
};

export const createAnnouncement = (announcement: Omit<Announcement, 'id' | 'createdAt' | 'readBy'>): Announcement => {
  const announcements = getAnnouncements();
  const newAnnouncement: Announcement = {
    ...announcement,
    id: `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    readBy: [],
  };
  announcements.unshift(newAnnouncement);
  localStorage.setItem('teacherAnnouncements', JSON.stringify(announcements));
  return newAnnouncement;
};

// Resources

export const getTeacherResources = (): TeacherResource[] => {
  if (typeof window === 'undefined') return [];
  const resources = localStorage.getItem('teacherResources');
  return resources ? JSON.parse(resources) : [];
};

export const uploadResource = (resource: Omit<TeacherResource, 'id' | 'createdAt' | 'downloads' | 'rating' | 'reviews'>): TeacherResource => {
  const resources = getTeacherResources();
  const newResource: TeacherResource = {
    ...resource,
    id: `resource-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    downloads: 0,
    rating: 0,
    reviews: [],
  };
  resources.unshift(newResource);
  localStorage.setItem('teacherResources', JSON.stringify(resources));
  return newResource;
};

export const addResourceReview = (resourceId: string, review: Omit<ResourceReview, 'id' | 'createdAt'>): void => {
  const resources = getTeacherResources();
  const resourceIndex = resources.findIndex(r => r.id === resourceId);
  
  if (resourceIndex === -1) return;
  
  const newReview: ResourceReview = {
    ...review,
    id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  
  resources[resourceIndex].reviews.push(newReview);
  
  // Update average rating
  const totalRating = resources[resourceIndex].reviews.reduce((sum, r) => sum + r.rating, 0);
  resources[resourceIndex].rating = totalRating / resources[resourceIndex].reviews.length;
  
  localStorage.setItem('teacherResources', JSON.stringify(resources));
};
