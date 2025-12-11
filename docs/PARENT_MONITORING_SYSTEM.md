# Parent Monitoring System - Extension Plan

## Current Implementation (JHS Only)

### Existing Features in Profile Page (`src/app/profile/page.tsx`)

1. **Student Linking Code System**
   - 6-digit alphanumeric code generated per student
   - Stored in localStorage: `studentLinkingCodes`
   - Code persists across sessions
   - Copy-to-clipboard functionality

2. **Parent Email Invitation**
   - Student can invite parent via email
   - Send invitation with linking code
   - Currently shows TODO for email implementation

3. **Privacy Notice**
   - Parents can see: study progress, quiz scores, lesson completion
   - Private: personal messages, profile details

4. **Linked Parents Display**
   - Shows list of linked parent accounts
   - Option to remove linked parents
   - Stored in Firestore: `students/{uid}` document with `linkedParents` array

### Progress Tracking System (`src/lib/user-progress.ts`)

**Currently Tracked (NOT education-level specific):**
- `completedLessons[]` - Array of lesson IDs
- `quizScores[]` - Array of quiz scores
- `lastActivityDate` - Last activity timestamp
- `currentStreak` - Current daily streak
- `longestStreak` - Longest streak achieved
- `totalXP` - Total experience points
- Stored in: `localStorage.userProgress`

**Metrics Calculated:**
- Lessons completed count
- Quizzes taken count
- Average quiz score
- Points (10 per lesson)
- Level (100 XP per level)
- XP progress to next level

---

## Problem: Current System Limitations

1. **No Education Level Differentiation**
   - Progress is tracked globally, not per education level
   - Cannot distinguish between Primary, JHS, and SHS performance
   - Parents can't see specific level performance

2. **No Subject-Level Tracking**
   - Cannot see performance per subject
   - No breakdown by Math vs English vs Science

3. **No Time-Based Analytics**
   - No weekly/monthly performance trends
   - No study time tracking
   - No activity patterns

4. **No Parent Dashboard**
   - Parent linking code exists but no parent view
   - No dedicated parent portal/dashboard
   - No parent notification system

5. **No Detailed Quiz Analytics**
   - Only average score tracked
   - No per-topic performance
   - No weak areas identification
   - No improvement tracking

---

## Proposed Solution: Multi-Level Parent Monitoring System

### Phase 1: Enhanced Progress Tracking

#### 1.1 Education-Level Specific Tracking

**New Data Structure** (`src/lib/user-progress-multilevel.ts`):

```typescript
interface EducationLevelProgress {
  level: 'Primary' | 'JHS' | 'SHS';
  subjects: {
    [subjectSlug: string]: SubjectProgress;
  };
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  averageScore: number;
  xp: number;
  lastActive: string;
}

interface SubjectProgress {
  subjectName: string;
  subjectSlug: string;
  lessonsCompleted: string[]; // lesson IDs
  quizAttempts: QuizAttempt[];
  averageScore: number;
  timeSpent: number; // minutes
  strengths: string[]; // topic slugs where score > 80%
  weaknesses: string[]; // topic slugs where score < 60%
  lastStudied: string;
}

interface QuizAttempt {
  quizId: string;
  lessonId: string;
  topicSlug: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
  timeTaken: number; // seconds
  questionBreakdown: {
    correct: number;
    incorrect: number;
    skipped: number;
  };
}

interface UserProgressMultiLevel {
  userId: string;
  currentLevel: 'Primary' | 'JHS' | 'SHS';
  levels: {
    Primary?: EducationLevelProgress;
    JHS?: EducationLevelProgress;
    SHS?: EducationLevelProgress;
  };
  globalStats: {
    totalXP: number;
    currentStreak: number;
    longestStreak: number;
    achievements: string[];
    totalStudyTime: number; // minutes
    joinDate: string;
  };
}
```

**Storage Options:**
1. **Option A: Firestore (Recommended)**
   - Path: `students/{uid}/progress/{level}`
   - Real-time updates for parents
   - Scalable for multiple devices

2. **Option B: Hybrid (localStorage + Firestore)**
   - localStorage for quick access
   - Firestore for parent access and backup
   - Sync on internet connection

#### 1.2 Study Time Tracking

**Implementation**:
- Track time spent on each lesson page
- Use visibility API to pause when tab inactive
- Aggregate by subject and level
- Store per session with timestamps

```typescript
// New file: src/lib/study-time-tracker.ts
interface StudySession {
  lessonId: string;
  subjectSlug: string;
  educationLevel: 'Primary' | 'JHS' | 'SHS';
  startTime: string;
  endTime: string;
  duration: number; // seconds
  completed: boolean;
}
```

#### 1.3 Detailed Quiz Analytics

**Enhanced Quiz Result Storage**:
```typescript
interface DetailedQuizResult {
  quizId: string;
  lessonId: string;
  topicSlug: string;
  subjectSlug: string;
  educationLevel: 'Primary' | 'JHS' | 'SHS';
  timestamp: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  questions: {
    questionId: string;
    type: 'mcq' | 'truefalse' | 'fill' | 'matching';
    correct: boolean;
    studentAnswer: string;
    correctAnswer: string;
    timeSpent: number;
  }[];
  strengths: string[]; // question categories with 80%+ accuracy
  needsImprovement: string[]; // question categories with <60% accuracy
}
```

---

### Phase 2: Parent Dashboard

#### 2.1 Parent Account System

**New Files**:
- `src/app/parent-portal/page.tsx` - Main parent dashboard
- `src/app/parent-portal/[childId]/page.tsx` - Specific child view
- `src/app/parent-portal/link-child/page.tsx` - Link child using code

**Parent Profile Structure** (Firestore: `parents/{uid}`):
```typescript
interface ParentProfile {
  uid: string;
  email: string;
  name: string;
  linkedChildren: {
    studentId: string;
    studentName: string;
    educationLevel: 'Primary' | 'JHS' | 'SHS';
    linkedDate: string;
    relationship: 'parent' | 'guardian' | 'teacher';
  }[];
  notificationPreferences: {
    email: boolean;
    weeklyReport: boolean;
    achievements: boolean;
    lowPerformance: boolean;
  };
  createdAt: string;
}
```

#### 2.2 Parent Dashboard Features

**Overview Tab** (`/parent-portal`):
- List of all linked children
- Quick stats per child (current level, recent activity, overall score)
- Recent achievements
- Alerts (low performance, missed study days)

**Child Detail View** (`/parent-portal/[childId]`):

1. **Performance Summary Card**
   - Current education level
   - Overall average score
   - Total lessons completed
   - Current streak
   - Study time this week/month

2. **Level-Specific Performance**
   - Tabs for Primary, JHS, SHS
   - Per-level statistics
   - Subject breakdown

3. **Subject Performance Grid**
   ```
   Subject         Progress    Avg Score   Last Studied   Status
   ------------------------------------------------------------
   Mathematics     15/30       78%         2 days ago     ⚠️ Needs attention
   English         25/30       92%         1 day ago      ✅ Excellent
   Science         10/30       65%         3 days ago     📚 In progress
   ```

4. **Study Activity Chart**
   - Weekly/monthly study time graph
   - Daily streak calendar
   - Most studied subjects

5. **Quiz Performance Analytics**
   - Recent quiz scores with trends
   - Strongest topics (strengths)
   - Topics needing improvement (weaknesses)
   - Comparison with class average (if available)

6. **Achievements & Milestones**
   - Unlocked achievements
   - Progress to next achievement
   - XP level and rank

7. **Study Schedule & Recommendations**
   - Last activity timestamp
   - Suggested study plan
   - Topics to review based on performance

8. **Downloadable Reports**
   - PDF weekly/monthly report
   - Excel export of detailed stats
   - WASSCE/BECE preparation progress

---

### Phase 3: Notification System

#### 3.1 Parent Notifications

**Trigger Events**:
1. **Achievement Unlocked** - Child earned new badge
2. **Weekly Summary** - Sunday evening report
3. **Low Performance Alert** - Quiz score below 50% three times
4. **Inactivity Alert** - No study activity for 3+ days
5. **Milestone Reached** - Level up, 100 lessons completed, etc.
6. **Exam Reminder** - WASSCE/BECE approaching

**Implementation**:
- Email notifications using Firebase Functions or SendGrid
- In-app notifications in parent dashboard
- Configurable per parent preferences

#### 3.2 Student Privacy Controls

**Student Can Control**:
- Which parents see their data
- Whether to share quiz details or just scores
- Temporary "privacy mode" for practice quizzes
- Remove linked parent accounts

---

### Phase 4: Advanced Features (Future)

#### 4.1 Multi-Child Comparison

For parents with multiple children:
- Side-by-side performance comparison
- Study time comparison
- Identify which child needs more support

#### 4.2 Teacher/School Portal

Extend system for schools:
- School admin can view all students
- Class-level analytics
- Identify struggling students
- Generate school reports

#### 4.3 Gamification for Parents

- "Supportive Parent" badges for parents
- Parent community forums
- Tips and resources for supporting learning

#### 4.4 AI-Powered Insights

- Predict exam performance based on progress
- Personalized study plan recommendations
- Identify optimal study times
- Suggest intervention strategies

---

## Implementation Roadmap

### Week 1-2: Foundation
- [x] Review current system
- [ ] Design new data structures
- [ ] Create migration plan for existing data
- [ ] Set up Firestore security rules for parent access

### Week 3-4: Enhanced Tracking
- [ ] Implement multi-level progress tracking
- [ ] Add study time tracking
- [ ] Enhance quiz result storage
- [ ] Create analytics functions

### Week 5-6: Parent Dashboard
- [ ] Create parent account system
- [ ] Build parent dashboard UI
- [ ] Implement child linking flow
- [ ] Add performance visualizations

### Week 7-8: Integration & Testing
- [ ] Integrate with Primary, JHS, SHS content
- [ ] Test with sample data
- [ ] Add parent onboarding flow
- [ ] Create user documentation

### Week 9-10: Polish & Launch
- [ ] Add notification system
- [ ] Implement privacy controls
- [ ] Performance optimization
- [ ] Beta testing with real users

---

## Technical Considerations

### Security & Privacy

1. **Firestore Security Rules**:
```javascript
// Allow parents to read child data only if linked
match /students/{studentId}/progress/{document=**} {
  allow read: if request.auth != null && 
    (request.auth.uid == studentId || 
     exists(/databases/$(database)/documents/students/$(studentId)) &&
     get(/databases/$(database)/documents/students/$(studentId)).data.linkedParents.hasAny([request.auth.uid]));
}
```

2. **Data Encryption**:
- Sensitive data encrypted at rest
- Use Firebase Auth for secure authentication
- HTTPS only for all connections

### Performance

1. **Caching Strategy**:
- Cache parent dashboard data
- Refresh every 5 minutes or on manual refresh
- Use optimistic updates for instant feedback

2. **Query Optimization**:
- Index frequently queried fields
- Paginate large result sets
- Use Firestore composite indexes

### Scalability

1. **Data Aggregation**:
- Run daily Cloud Functions to aggregate stats
- Store pre-computed metrics
- Avoid real-time calculations for large datasets

2. **Cost Optimization**:
- Batch writes where possible
- Use Firestore bundles for initial load
- Implement data retention policies (e.g., keep detailed quiz data for 6 months)

---

## Migration Strategy

### For Existing Users

1. **Automatic Migration**:
   - Detect old `localStorage.userProgress` format
   - Convert to new multi-level structure
   - Assign to current education level
   - Keep backward compatibility

2. **Data Backfill**:
   - Existing completed lessons → assign to current level
   - Existing quiz scores → assign to current level
   - Prompt user to confirm education level

3. **Gradual Rollout**:
   - Phase 1: Enable for new users
   - Phase 2: Migrate existing users
   - Phase 3: Deprecate old system

---

## Success Metrics

### Student Engagement
- Increase in daily active users
- Longer study sessions
- Higher lesson completion rate

### Parent Engagement
- Number of active parent accounts
- Parent dashboard daily active users
- Parent satisfaction survey scores

### Academic Performance
- Improvement in quiz scores over time
- Increased WASSCE/BECE pass rates
- Better topic mastery rates

---

## Next Steps

1. **Stakeholder Approval**
   - Review this plan with team
   - Get feedback from parents and students
   - Prioritize features

2. **Technical Spike**
   - Test Firestore performance with sample data
   - Prototype parent dashboard UI
   - Validate data structure design

3. **Start Implementation**
   - Begin with Phase 1 (Enhanced Tracking)
   - Parallel work on Phase 2 (Parent Dashboard)
   - Iterate based on feedback

---

**Document Version**: 1.0  
**Last Updated**: December 11, 2025  
**Author**: Development Team
