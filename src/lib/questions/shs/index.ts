/**
 * SHS Questions Index
 * 
 * This file combines all SHS subject question banks.
 * For scalability, each subject should have its own file.
 * 
 * Currently, questions are in challenge-questions.ts.
 * As we migrate to modular structure, import from subject files here.
 */

import type { ChallengeQuestion } from '../types';

// TODO: Migrate to modular structure
// Import from individual subject files:
// import { chemistryQuestions } from './chemistry';
// import { physicsQuestions } from './physics';
// etc.

// For now, this is a placeholder that will be populated
// by importing from challenge-questions.ts
export const shsQuestionBank: ChallengeQuestion[] = [];

// Future structure:
// export const shsQuestionBank: ChallengeQuestion[] = [
//   ...chemistryQuestions,
//   ...physicsQuestions,
//   ...coreMathematicsQuestions,
//   ...integratedScienceQuestions,
//   ...englishLanguageQuestions,
//   ...socialStudiesQuestions,
// ];
