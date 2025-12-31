# Question Bank Architecture - Scalable System

## Overview
The question bank system is designed to be **scalable** and **strictly filtered by education level**. Each level (Primary, JHS, SHS) has its own question bank and students can ONLY access questions from their level.

## Level Filtering (STRICT)

### Primary Students
- **ONLY** access questions from `primaryQuestionBank`
- Subjects: Mathematics, English Language, Science, Social Studies
- Questions are age-appropriate and curriculum-aligned

### JHS Students
- **ONLY** access questions from BECE question bank (`bece-questions.ts`)
- Can also access JHS past questions (when integrated)
- Subjects: Mathematics, English Language, Science, Social Studies, ICT, Creative Arts, French

### SHS Students
- **ONLY** access questions from `shsQuestionBank` (WASSCE level)
- Can also access SHS past questions (WASSCE past questions)
- Subjects: Core Mathematics, English Language, Integrated Science, Social Studies

## Question Bank Structure

### Primary Question Bank
**Location:** `src/lib/challenge-questions.ts` - `primaryQuestionBank` array

**Current Size:** ~15 questions (expandable)

**To Add More Questions:**
```typescript
{
  id: 'primary-math-XXX', // Unique ID
  question: 'Your question here?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0, // Index of correct option (0-3)
  subject: 'Mathematics', // or 'English Language', 'Science', 'Social Studies'
  difficulty: 'easy', // or 'medium', 'hard'
  level: 'Primary', // MUST be 'Primary'
  topic: 'Topic name',
  explanation: 'Explanation of the answer'
}
```

### JHS Question Bank
**Location:** `src/lib/bece-questions.ts` - `beceQuestions` array

**Current Size:** ~150 questions

**To Add More Questions:**
- Add to `beceQuestions` array in `bece-questions.ts`
- Use the `createQuestion` helper function
- Questions automatically filtered by level

### SHS Question Bank
**Location:** `src/lib/challenge-questions.ts` - `shsQuestionBank` array

**Current Size:** ~100 questions (expandable)

**To Add More Questions:**
- Add to `shsQuestionBank` array
- Follow the same structure as Primary questions
- Ensure `level: 'SHS'` is set

## Past Questions Integration

### SHS Past Questions
**Location:** `src/lib/past-questions.ts`

**Current Status:** Theory questions available, MCQ conversion pending

**Integration:**
- Past questions are WASSCE level (SHS)
- Currently theory-based, need MCQ conversion for challenge use
- Function `getPastQuestionsAsChallengeQuestions()` ready for integration

### JHS Past Questions
**Location:** To be added

**Status:** BECE past questions can be added to `past-questions.ts` and integrated similarly

## Scalable Loading Architecture

### Current Implementation
- **Static Arrays:** Questions stored in arrays (fast, simple)
- **Anti-Repeat Logic:** Tracks recently used questions per user/level
- **Subject Filtering:** Questions filtered by subject
- **Difficulty Filtering:** Questions filtered by difficulty

### Future Extensibility

#### 1. Load from External API
```typescript
// Example function (placeholder in code)
const questions = await loadQuestionsFromExternalSource('SHS', 'Core Mathematics', 'api');
```

#### 2. Load from Database
```typescript
const questions = await loadQuestionsFromExternalSource('JHS', 'Mathematics', 'database');
```

#### 3. Load from JSON Files
```typescript
const questions = await loadQuestionsFromExternalSource('Primary', 'Mathematics', 'json');
```

#### 4. Dynamic Question Addition
```typescript
// Add questions at runtime
addQuestionsToBank('SHS', newQuestions);
```

## Key Functions

### `getChallengeQuestions(level, subject, difficulty, count, userId)`
- **STRICT level filtering** - Only returns questions for the specified level
- Filters by subject and difficulty
- Implements anti-repeat logic
- Returns exactly `count` questions

### `getAvailableSubjects(level)`
- Returns available subjects for a given level
- Primary: Mathematics, English Language, Science, Social Studies
- JHS: Mathematics, English Language, Science, Social Studies, ICT, Creative Arts, French
- SHS: Core Mathematics, English Language, Integrated Science, Social Studies

### `getQuestionStats()`
- Returns question counts per level
- Useful for monitoring and scaling

### `hasEnoughQuestions(level, subject, difficulty, requiredCount)`
- Validates if enough questions exist for a challenge
- Returns boolean

## Adding Questions - Quick Guide

### For Primary Level:
1. Open `src/lib/challenge-questions.ts`
2. Find `primaryQuestionBank` array
3. Add new question object following the structure
4. Ensure `level: 'Primary'` is set

### For JHS Level:
1. Open `src/lib/bece-questions.ts`
2. Use `createQuestion()` helper function
3. Add to `beceQuestions` array
4. Level is automatically set to JHS

### For SHS Level:
1. Open `src/lib/challenge-questions.ts`
2. Find `shsQuestionBank` array
3. Add new question object
4. Ensure `level: 'SHS'` is set

## Best Practices

1. **Always set the correct level** - This ensures strict filtering
2. **Use unique IDs** - Format: `{level}-{subject}-{number}`
3. **Include explanations** - Helps students learn
4. **Set appropriate difficulty** - easy, medium, or hard
5. **Add topics** - Helps with organization and filtering

## Future Enhancements

1. **Bulk Import:** Load questions from CSV/Excel
2. **API Integration:** Fetch questions from external APIs
3. **Database Storage:** Store questions in database for easier management
4. **Question Validation:** Automated validation of question quality
5. **Analytics:** Track which questions are most/least used
6. **Difficulty Auto-Adjustment:** Adjust difficulty based on student performance

## Testing Level Filtering

To verify strict level filtering:
1. Create a challenge as a Primary student - should only get Primary questions
2. Create a challenge as a JHS student - should only get JHS questions
3. Create a challenge as a SHS student - should only get SHS questions

No cross-level access should be possible.

