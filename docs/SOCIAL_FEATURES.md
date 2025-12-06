# Social Features Documentation

## Overview
SmartJHS now includes comprehensive social features that enable students to collaborate, share achievements, and help each other learn.

## Features

### 1. Study Groups
**Location:** `/study-groups`

**Features:**
- Create public or private study groups
- Join groups with invite codes (for private groups)
- Group messaging with posts and replies
- Like posts and replies
- Members sidebar with points ranking
- Real-time updates
- Search and filter groups by subject

**How to Use:**
1. Click "Social" → "Study Groups" in the header
2. Create a new group or join existing ones
3. Post messages, ask questions, share resources
4. Interact with classmates through likes and replies

### 2. Achievement Sharing
**Location:** `/achievements-feed`

**Features:**
- Share unlocked achievements with custom messages
- Like shared achievements
- Comment on achievements
- View top achievers
- See personal achievement gallery

**How to Use:**
1. Click "Social" → "Achievements" in the header
2. Click "Share Achievement" to post your accomplishment
3. Add a personal message about how you feel
4. Interact with classmates' achievements

### 3. Q&A Community
**Location:** `/community`

**Features:**
- Ask questions by subject
- Browse questions with filtering (all/open/answered)
- Answer classmates' questions
- Mark best answers (question owner only)
- Like questions and answers
- Tag questions for better organization
- View question statistics (views, answers, likes)

**How to Use:**
1. Click "Social" → "Q&A Community" in the header
2. Browse questions or use search
3. Click "Ask Question" to post your own question
4. Answer questions to help classmates
5. Mark helpful answers as "Best Answer"

## Navigation

### Desktop
Access social features through the "Social" dropdown menu in the header:
- **Study Groups** - Collaborate with classmates
- **Achievements** - Share and celebrate progress
- **Q&A Community** - Ask and answer questions

### Mobile
Social features are accessible through the header menu. Future updates will include mobile-optimized navigation.

## Data Storage

Currently, all social features use **localStorage** for data persistence:
- `studyGroups` - All study groups
- `groupPosts-{groupId}` - Posts for each group
- `questions` - All Q&A questions
- `sharedAchievements` - Shared achievement posts

**Note:** Future updates will migrate to Firestore for real-time synchronization across devices.

## Technical Details

### Core Library
**File:** `src/lib/social.ts`

**Key Interfaces:**
- `StudyGroup` - Group data structure
- `GroupMember` - Member information
- `GroupPost` - Group messages
- `Question` - Q&A questions
- `Answer` - Question answers
- `AchievementShare` - Shared achievements

**Key Functions:**
```typescript
// Study Groups
createStudyGroup(group)
joinStudyGroup(groupId, inviteCode?)
getMyGroups()
getAllGroups()

// Group Posts
createGroupPost(groupId, post)
togglePostLike(groupId, postId)
addPostReply(groupId, postId, content)

// Q&A
createQuestion(question)
addAnswer(questionId, content)
markBestAnswer(questionId, answerId)
incrementQuestionViews(questionId)
toggleQuestionLike(questionId)

// Achievement Sharing
shareAchievement(achievementId, name, icon, message)
toggleAchievementLike(shareId)
addAchievementComment(shareId, content)
```

## Future Enhancements

1. **Real-time Updates**
   - Migrate to Firestore
   - Live notifications for new messages
   - Online status indicators

2. **Enhanced Moderation**
   - Report inappropriate content
   - Admin moderation tools
   - Content filtering

3. **Additional Features**
   - Direct messaging between students
   - Study session scheduling
   - Resource sharing (files, links)
   - Video call integration
   - Polls and surveys within groups

4. **Gamification Integration**
   - XP rewards for helping classmates
   - Achievement badges for community participation
   - Leaderboard for most helpful students

5. **Mobile App**
   - Push notifications for group messages
   - Native mobile navigation
   - Offline mode support

## Best Practices

### For Students
1. **Be Respectful** - Treat classmates with kindness
2. **Stay On Topic** - Keep discussions focused on learning
3. **Give Credit** - Acknowledge sources and helpers
4. **Ask Clear Questions** - Provide context and details
5. **Help Others** - Share your knowledge generously

### For Parents/Teachers
1. Monitor group activities
2. Encourage positive collaboration
3. Report any concerns
4. Celebrate student achievements
5. Guide students in digital citizenship

## Support

If you encounter any issues with social features:
1. Check your internet connection
2. Refresh the page
3. Clear browser cache if problems persist
4. Contact support with specific error details

---

**Version:** 1.0  
**Last Updated:** December 2024  
**Status:** Active Development
