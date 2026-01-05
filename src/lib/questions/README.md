# Scalable Question Bank Structure

This directory contains questions organized by level and subject for better maintainability and scalability.

## Structure

```
questions/
  ├── types.ts              # Shared types
  ├── shs/                  # SHS questions
  │   ├── chemistry.ts      # Chemistry questions (90 questions)
  │   ├── physics.ts        # Physics questions (120 questions)
  │   ├── core-mathematics.ts
  │   ├── integrated-science.ts
  │   ├── english-language.ts
  │   ├── social-studies.ts
  │   └── index.ts          # Exports all SHS questions
  ├── jhs/                  # JHS questions (can be added later)
  └── primary/              # Primary questions (can be added later)
```

## Adding New Questions

### For SHS Questions:
1. Add questions to the appropriate subject file in `questions/shs/`
2. Questions are automatically included via the index file
3. Follow the format in existing files

### Example:
```typescript
// src/lib/questions/shs/chemistry.ts
import type { ChallengeQuestion } from '../types';

export const chemistryQuestions: ChallengeQuestion[] = [
  {
    id: 'wassce-2023-chem-001',
    question: '...',
    options: ['...', '...', '...', '...'],
    correctAnswer: 1,
    subject: 'Chemistry',
    difficulty: 'medium',
    classLevel: 'SHS 2',
    level: 'SHS',
    topic: 'Atomic Structure',
    explanation: '...'
  },
  // ... more questions
];
```

## Benefits

- **Scalable**: Each subject in its own file (manageable size)
- **Maintainable**: Easy to find and update questions
- **Collaborative**: Multiple developers can work on different subjects
- **Organized**: Clear structure by level and subject
- **Fast**: Smaller files = faster parsing and better IDE performance
