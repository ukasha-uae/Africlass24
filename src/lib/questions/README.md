# Scalable Question Bank Structure

This directory contains questions organized by level and subject for better maintainability and scalability.

## Structure

```
questions/
  ├── types.ts                    # Question type definitions
  ├── MIGRATION_GUIDE.md          # Guide for migrating questions
  ├── shs/                        # SHS questions
  │   ├── chemistry.ts            # Chemistry questions
  │   ├── physics.ts              # Physics questions
  │   ├── biology.ts              # Biology questions
  │   ├── elective-mathematics.ts # Elective Mathematics questions
  │   └── index.ts                # Exports all SHS questions
  ├── jhs/                        # JHS questions (to be added)
  └── primary/                    # Primary questions (to be added)
```

## Question Types Supported

1. **MCQ (Multiple Choice)** - Traditional multiple choice questions
2. **True/False** - Binary choice questions  
3. **Fill in the Blank** - Questions with blank spaces to fill
4. **Matching** - Match items from two lists
5. **Short Answer** - Text-based answers with acceptable alternatives
6. **Essay** - Long-form written responses

## Adding New Questions

### For SHS Questions:
1. Add questions to the appropriate subject file in `questions/shs/`
2. Questions are automatically included via the index file
3. Use different question types for variety
4. Follow the format in existing files

### Example - MCQ:
```typescript
// src/lib/questions/shs/chemistry.ts
import type { ChallengeQuestion } from '../types';

export const chemistryQuestions: ChallengeQuestion[] = [
  {
    id: 'wassce-2023-chem-001',
    type: 'mcq',
    question: 'What is the atomic number of carbon?',
    options: ['6', '12', '14', '18'],
    correctAnswer: 0,
    subject: 'Chemistry',
    difficulty: 'easy',
    classLevel: 'SHS 1',
    level: 'SHS',
    topic: 'Atomic Structure',
    explanation: 'Carbon has atomic number 6',
    source: 'actual WASSCE',
    year: 2023
  },
];
```

### Example - True/False:
```typescript
{
  id: 'wassce-2023-chem-tf-001',
  type: 'true-false',
  question: 'Sodium chloride is a covalent compound.',
  correctAnswer: false,
  subject: 'Chemistry',
  difficulty: 'medium',
  classLevel: 'SHS 2',
  level: 'SHS',
  topic: 'Chemical Bonding',
  explanation: 'Sodium chloride is ionic, not covalent.',
  source: 'actual WASSCE',
  year: 2023
}
```

See `MIGRATION_GUIDE.md` for more examples of all question types.

## Benefits

- **Scalable**: Each subject in its own file (manageable size)
- **Maintainable**: Easy to find and update questions
- **Varied**: Multiple question types for better assessment
- **Collaborative**: Multiple developers can work on different subjects
- **Organized**: Clear structure by level and subject
- **Fast**: Smaller files = faster parsing and better IDE performance
