// Social Features - Study Groups, Achievements, Q&A

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  members: GroupMember[];
  isPrivate: boolean;
  inviteCode?: string;
  avatar?: string;
  educationLevel?: 'Primary' | 'JHS' | 'SHS';
}

export interface GroupMember {
  userId: string;
  userName: string;
  userAvatar?: string;
  role: 'admin' | 'member';
  joinedAt: string;
  points: number;
}

export interface GroupPost {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  type: 'message' | 'question' | 'achievement' | 'resource';
  attachments?: string[];
  likes: string[]; // userIds
  replies: GroupReply[];
  createdAt: string;
  updatedAt: string;
}

export interface GroupReply {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: string[];
  createdAt: string;
}

export interface Question {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  subject: string;
  title: string;
  content: string;
  tags: string[];
  attachments?: string[];
  answers: Answer[];
  bestAnswerId?: string;
  views: number;
  likes: string[];
  status: 'open' | 'answered' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: string[];
  isBestAnswer: boolean;
  createdAt: string;
}

export interface AchievementShare {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  achievementId: string;
  achievementName: string;
  achievementIcon: string;
  message?: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

// Study Groups Functions

export const getMyGroups = (): StudyGroup[] => {
  if (typeof window === 'undefined') return [];
  const groups = localStorage.getItem('studyGroups');
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  
  if (!groups) return [];
  
  const allGroups: StudyGroup[] = JSON.parse(groups);
  return allGroups.filter(g => g.members.some(m => m.userId === userId));
};

export const getAllGroups = (): StudyGroup[] => {
  if (typeof window === 'undefined') return [];
  const groups = localStorage.getItem('studyGroups');
  return groups ? JSON.parse(groups) : [];
};

export const createStudyGroup = (group: Omit<StudyGroup, 'id' | 'createdAt' | 'members'>): StudyGroup => {
  const groups = getAllGroups();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  const userName = localStorage.getItem('currentUserName') || 'Student';
  
  const newGroup: StudyGroup = {
    ...group,
    id: `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    inviteCode: group.isPrivate ? generateInviteCode() : undefined,
    members: [{
      userId,
      userName,
      role: 'admin',
      joinedAt: new Date().toISOString(),
      points: 0,
    }],
  };
  
  groups.push(newGroup);
  localStorage.setItem('studyGroups', JSON.stringify(groups));
  return newGroup;
};

export const joinStudyGroup = (groupId: string, inviteCode?: string): boolean => {
  const groups = getAllGroups();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  const userName = localStorage.getItem('currentUserName') || 'Student';
  
  const groupIndex = groups.findIndex(g => g.id === groupId);
  if (groupIndex === -1) return false;
  
  const group = groups[groupIndex];
  
  // Check if already a member
  if (group.members.some(m => m.userId === userId)) {
    return false;
  }
  
  // Check invite code for private groups
  if (group.isPrivate && group.inviteCode !== inviteCode) {
    return false;
  }
  
  group.members.push({
    userId,
    userName,
    role: 'member',
    joinedAt: new Date().toISOString(),
    points: 0,
  });
  
  groups[groupIndex] = group;
  localStorage.setItem('studyGroups', JSON.stringify(groups));
  return true;
};

export const leaveStudyGroup = (groupId: string): boolean => {
  const groups = getAllGroups();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  
  const groupIndex = groups.findIndex(g => g.id === groupId);
  if (groupIndex === -1) return false;
  
  const group = groups[groupIndex];
  group.members = group.members.filter(m => m.userId !== userId);
  
  // Delete group if no members left
  if (group.members.length === 0) {
    groups.splice(groupIndex, 1);
  } else {
    groups[groupIndex] = group;
  }
  
  localStorage.setItem('studyGroups', JSON.stringify(groups));
  return true;
};

const generateInviteCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Group Posts Functions

export const getGroupPosts = (groupId: string): GroupPost[] => {
  if (typeof window === 'undefined') return [];
  const posts = localStorage.getItem(`groupPosts-${groupId}`);
  return posts ? JSON.parse(posts) : [];
};

export const createGroupPost = (groupId: string, post: Omit<GroupPost, 'id' | 'groupId' | 'userId' | 'userName' | 'userAvatar' | 'likes' | 'replies' | 'createdAt' | 'updatedAt'>): GroupPost => {
  const posts = getGroupPosts(groupId);
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  const userName = localStorage.getItem('currentUserName') || 'Student';
  
  const newPost: GroupPost = {
    ...post,
    groupId,
    id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    userName,
    likes: [],
    replies: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  posts.unshift(newPost);
  localStorage.setItem(`groupPosts-${groupId}`, JSON.stringify(posts));
  return newPost;
};

export const togglePostLike = (groupId: string, postId: string): void => {
  const posts = getGroupPosts(groupId);
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return;
  
  const post = posts[postIndex];
  const likeIndex = post.likes.indexOf(userId);
  
  if (likeIndex > -1) {
    post.likes.splice(likeIndex, 1);
  } else {
    post.likes.push(userId);
  }
  
  posts[postIndex] = post;
  localStorage.setItem(`groupPosts-${groupId}`, JSON.stringify(posts));
};

export const addPostReply = (groupId: string, postId: string, content: string): void => {
  const posts = getGroupPosts(groupId);
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  const userName = localStorage.getItem('currentUserName') || 'Student';
  
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) return;
  
  const reply: GroupReply = {
    id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    userName,
    content,
    likes: [],
    createdAt: new Date().toISOString(),
  };
  
  posts[postIndex].replies.push(reply);
  posts[postIndex].updatedAt = new Date().toISOString();
  localStorage.setItem(`groupPosts-${groupId}`, JSON.stringify(posts));
};

// Questions Functions

export const getAllQuestions = (): Question[] => {
  if (typeof window === 'undefined') return [];
  const questions = localStorage.getItem('questions');
  return questions ? JSON.parse(questions) : [];
};

export const getQuestionsBySubject = (subject: string): Question[] => {
  return getAllQuestions().filter(q => q.subject === subject);
};

export const createQuestion = (question: Omit<Question, 'id' | 'userId' | 'userName' | 'userAvatar' | 'answers' | 'views' | 'likes' | 'status' | 'createdAt' | 'updatedAt'>): Question => {
  const questions = getAllQuestions();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  const userName = localStorage.getItem('currentUserName') || 'Student';
  
  const newQuestion: Question = {
    ...question,
    id: `question-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    userName,
    answers: [],
    views: 0,
    likes: [],
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  questions.unshift(newQuestion);
  localStorage.setItem('questions', JSON.stringify(questions));
  return newQuestion;
};

export const addAnswer = (questionId: string, content: string): Answer => {
  const questions = getAllQuestions();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  const userName = localStorage.getItem('currentUserName') || 'Student';
  
  const questionIndex = questions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) throw new Error('Question not found');
  
  const answer: Answer = {
    id: `answer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    questionId,
    userId,
    userName,
    content,
    likes: [],
    isBestAnswer: false,
    createdAt: new Date().toISOString(),
  };
  
  questions[questionIndex].answers.push(answer);
  questions[questionIndex].status = 'answered';
  questions[questionIndex].updatedAt = new Date().toISOString();
  localStorage.setItem('questions', JSON.stringify(questions));
  return answer;
};

export const incrementQuestionViews = (questionId: string): void => {
  const questions = getAllQuestions();
  const questionIndex = questions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) return;
  
  questions[questionIndex].views++;
  localStorage.setItem('questions', JSON.stringify(questions));
};

export const toggleQuestionLike = (questionId: string): void => {
  const questions = getAllQuestions();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  
  const questionIndex = questions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) return;
  
  const question = questions[questionIndex];
  const likeIndex = question.likes.indexOf(userId);
  
  if (likeIndex > -1) {
    question.likes.splice(likeIndex, 1);
  } else {
    question.likes.push(userId);
  }
  
  localStorage.setItem('questions', JSON.stringify(questions));
};

export const markBestAnswer = (questionId: string, answerId: string): void => {
  const questions = getAllQuestions();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  
  const questionIndex = questions.findIndex(q => q.id === questionId);
  if (questionIndex === -1) return;
  
  const question = questions[questionIndex];
  
  // Only question owner can mark best answer
  if (question.userId !== userId) return;
  
  // Remove previous best answer
  question.answers.forEach(a => a.isBestAnswer = false);
  
  // Set new best answer
  const answerIndex = question.answers.findIndex(a => a.id === answerId);
  if (answerIndex > -1) {
    question.answers[answerIndex].isBestAnswer = true;
    question.bestAnswerId = answerId;
  }
  
  questions[questionIndex] = question;
  localStorage.setItem('questions', JSON.stringify(questions));
};

// Achievement Sharing Functions

export const getAllAchievementShares = (): AchievementShare[] => {
  if (typeof window === 'undefined') return [];
  const shares = localStorage.getItem('sharedAchievements');
  return shares ? JSON.parse(shares) : [];
};

export const getSharedAchievements = (): AchievementShare[] => {
  if (typeof window === 'undefined') return [];
  const shares = localStorage.getItem('sharedAchievements');
  return shares ? JSON.parse(shares) : [];
};

export const shareAchievement = (achievementId: string, achievementName: string, achievementIcon: string, message?: string): AchievementShare => {
  const shares = getSharedAchievements();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  const userName = localStorage.getItem('currentUserName') || 'Student';
  
  const newShare: AchievementShare = {
    id: `share-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    userName,
    achievementId,
    achievementName,
    achievementIcon,
    message,
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  };
  
  shares.unshift(newShare);
  localStorage.setItem('sharedAchievements', JSON.stringify(shares));
  return newShare;
};

export const toggleAchievementLike = (shareId: string): void => {
  const shares = getSharedAchievements();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  
  const shareIndex = shares.findIndex(s => s.id === shareId);
  if (shareIndex === -1) return;
  
  const share = shares[shareIndex];
  const likeIndex = share.likes.indexOf(userId);
  
  if (likeIndex > -1) {
    share.likes.splice(likeIndex, 1);
  } else {
    share.likes.push(userId);
  }
  
  shares[shareIndex] = share;
  localStorage.setItem('sharedAchievements', JSON.stringify(shares));
};

export const addAchievementComment = (shareId: string, content: string): void => {
  const shares = getSharedAchievements();
  const userId = localStorage.getItem('currentUserId') || 'user-1';
  const userName = localStorage.getItem('currentUserName') || 'Student';
  
  const shareIndex = shares.findIndex(s => s.id === shareId);
  if (shareIndex === -1) return;
  
  const comment: Comment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    userName,
    content,
    createdAt: new Date().toISOString(),
  };
  
  shares[shareIndex].comments.push(comment);
  localStorage.setItem('sharedAchievements', JSON.stringify(shares));
};

// Initialize with sample data
export const initializeSocialData = () => {
  if (typeof window === 'undefined') return;
  
  // Set current user if not set
  if (!localStorage.getItem('currentUserId')) {
    localStorage.setItem('currentUserId', 'user-1');
    localStorage.setItem('currentUserName', 'You');
  }
  
  // Add sample groups if none exist
  if (!localStorage.getItem('studyGroups')) {
    const sampleGroups: StudyGroup[] = [
      {
        id: 'group-sample-1',
        name: 'Mathematics Masterclass',
        description: 'Master algebra, geometry, and calculus together!',
        subject: 'Mathematics',
        createdBy: 'user-2',
        createdByName: 'Kwame',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        isPrivate: false,
        members: [
          { userId: 'user-2', userName: 'Kwame', role: 'admin', joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), points: 120 },
          { userId: 'user-3', userName: 'Ama', role: 'member', joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), points: 85 },
          { userId: 'user-4', userName: 'Kofi', role: 'member', joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), points: 62 },
        ],
      },
      {
        id: 'group-sample-2',
        name: 'Science Squad',
        description: 'Explore physics, chemistry, and biology concepts',
        subject: 'Science',
        createdBy: 'user-5',
        createdByName: 'Akua',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        isPrivate: false,
        members: [
          { userId: 'user-5', userName: 'Akua', role: 'admin', joinedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), points: 200 },
          { userId: 'user-6', userName: 'Yaw', role: 'member', joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), points: 145 },
        ],
      },
    ];
    localStorage.setItem('studyGroups', JSON.stringify(sampleGroups));
  }
  
  // Add sample questions
  if (!localStorage.getItem('questions')) {
    const sampleQuestions: Question[] = [
      {
        id: 'q-sample-1',
        userId: 'user-3',
        userName: 'Ama',
        subject: 'Mathematics',
        title: 'How do I solve quadratic equations using the formula?',
        content: 'I understand factoring, but I\'m struggling with the quadratic formula. Can someone explain the steps?',
        tags: ['algebra', 'quadratic', 'formula'],
        answers: [
          {
            id: 'a-1',
            questionId: 'q-sample-1',
            userId: 'user-2',
            userName: 'Kwame',
            content: 'The quadratic formula is x = (-b ± √(b²-4ac)) / 2a. First identify a, b, and c from ax² + bx + c = 0, then substitute into the formula!',
            likes: ['user-3', 'user-4'],
            isBestAnswer: true,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
        ],
        bestAnswerId: 'a-1',
        views: 24,
        likes: ['user-2', 'user-4', 'user-6'],
        status: 'answered',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem('questions', JSON.stringify(sampleQuestions));
  }
};
