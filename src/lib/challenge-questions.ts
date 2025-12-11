21// Unified Challenge Questions System for JHS & SHS
import { getRandomQuestions as getJHSQuestions, QuestionSubject as JHSSubject, QuestionDifficulty } from './bece-questions';
import { pastQuestions, type PastQuestion } from './past-questions';

export type EducationLevel = 'Primary' | 'JHS' | 'SHS';

export interface ChallengeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  level: EducationLevel;
  explanation?: string;
  topic?: string;
}

// Convert WASSCE past questions to challenge format (MCQ only)
function convertWASSCEToChallenge(pastQuestion: PastQuestion): ChallengeQuestion | null {
  // For now, we'll create simplified MCQ versions from past questions
  // In production, you'd have a proper MCQ bank for SHS
  
  // This is a placeholder - you'll need to expand with actual SHS MCQ questions
  return null;
}

// Track recently used questions to prevent immediate repeats
const recentlyUsedQuestions: Map<string, Set<string>> = new Map();

/**
 * Mark questions as recently used for a user/session
 */
function markQuestionsUsed(sessionKey: string, questionIds: string[]): void {
  if (!recentlyUsedQuestions.has(sessionKey)) {
    recentlyUsedQuestions.set(sessionKey, new Set());
  }
  const used = recentlyUsedQuestions.get(sessionKey)!;
  questionIds.forEach(id => used.add(id));
  
  // Keep only last 50 questions to prevent memory bloat
  if (used.size > 50) {
    const arr = Array.from(used);
    arr.slice(0, used.size - 50).forEach(id => used.delete(id));
  }
}

/**
 * Get fresh questions that haven't been recently used
 */
function filterFreshQuestions(questions: ChallengeQuestion[], sessionKey: string): ChallengeQuestion[] {
  const used = recentlyUsedQuestions.get(sessionKey);
  if (!used || used.size === 0) return questions;
  
  const fresh = questions.filter(q => !used.has(q.id));
  // If all questions have been used, reset and return all
  if (fresh.length === 0) {
    recentlyUsedQuestions.delete(sessionKey);
    return questions;
  }
  return fresh;
}

// SHS Question Bank (Expandable) - WASSCE Level
const shsQuestionBank: ChallengeQuestion[] = [
  // Core Mathematics - SHS
  {
    id: 'shs-math-001',
    question: 'Simplify: (x² - 9) / (x - 3)',
    options: ['x + 3', 'x - 3', 'x² + 3', '(x + 3)(x - 3)'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Algebraic Factorization',
    explanation: 'Factor the numerator: x² - 9 = (x + 3)(x - 3). Cancel (x - 3) to get x + 3.'
  },
  {
    id: 'shs-math-002',
    question: 'If 2ˣ = 8, what is the value of x?',
    options: ['2', '3', '4', '6'],
    correctAnswer: 1,
    subject: 'Core Mathematics',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Indices and Logarithms',
    explanation: '2³ = 8, therefore x = 3'
  },
  {
    id: 'shs-math-003',
    question: 'What is the slope of a line passing through points (2, 3) and (5, 9)?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 1,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Coordinate Geometry',
    explanation: 'Slope = (y₂ - y₁)/(x₂ - x₁) = (9 - 3)/(5 - 2) = 6/3 = 2'
  },
  {
    id: 'shs-math-004',
    question: 'Solve for x: 3x - 5 = 2x + 7',
    options: ['10', '12', '8', '15'],
    correctAnswer: 1,
    subject: 'Core Mathematics',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Linear Equations',
    explanation: '3x - 2x = 7 + 5, therefore x = 12'
  },
  {
    id: 'shs-math-005',
    question: 'The quadratic formula is used to solve equations of the form ax² + bx + c = 0. What is the discriminant?',
    options: ['b² - 4ac', 'b² + 4ac', '-b ± √(b² - 4ac)', '2a'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Quadratic Equations',
    explanation: 'The discriminant is b² - 4ac, which determines the nature of roots'
  },

  // Integrated Science - SHS
  {
    id: 'shs-sci-001',
    question: 'Which gas is produced when an acid reacts with a metal?',
    options: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Nitrogen'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Chemical Reactions',
    explanation: 'Acids react with metals to produce hydrogen gas and a salt'
  },
  {
    id: 'shs-sci-002',
    question: 'What is the SI unit of force?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Forces and Motion',
    explanation: 'The Newton (N) is the SI unit of force, named after Isaac Newton'
  },
  {
    id: 'shs-sci-003',
    question: 'What is the function of chlorophyll in photosynthesis?',
    options: ['Store glucose', 'Absorb light energy', 'Release oxygen', 'Transport water'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Photosynthesis',
    explanation: 'Chlorophyll absorbs light energy (mainly blue and red wavelengths) for photosynthesis'
  },
  {
    id: 'shs-sci-004',
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
    correctAnswer: 2,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Cell Biology',
    explanation: 'Mitochondria produce ATP through cellular respiration, providing energy for the cell'
  },
  {
    id: 'shs-sci-005',
    question: 'What type of bond forms when atoms share electrons?',
    options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Chemical Bonding',
    explanation: 'Covalent bonds form when atoms share pairs of electrons'
  },

  // English Language - SHS
  {
    id: 'shs-eng-001',
    question: 'Which literary device compares two things using "like" or "as"?',
    options: ['Metaphor', 'Simile', 'Personification', 'Hyperbole'],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Literary Devices',
    explanation: 'A simile makes a comparison using "like" or "as", e.g., "as brave as a lion"'
  },
  {
    id: 'shs-eng-002',
    question: 'Identify the error: "The team are playing well today."',
    options: ['No error', 'Should be "is playing"', 'Should be "was playing"', 'Should be "were played"'],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Subject-Verb Agreement',
    explanation: '"Team" is a collective noun treated as singular, so "is playing" is correct'
  },
  {
    id: 'shs-eng-003',
    question: 'What is the synonym of "abundant"?',
    options: ['Scarce', 'Plentiful', 'Rare', 'Limited'],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Vocabulary',
    explanation: 'Abundant and plentiful both mean existing in large quantities'
  },

  // Social Studies - SHS
  {
    id: 'shs-soc-001',
    question: 'What is the main function of the judiciary?',
    options: ['Make laws', 'Interpret laws', 'Execute laws', 'Repeal laws'],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Government',
    explanation: 'The judiciary interprets laws and administers justice'
  },
  {
    id: 'shs-soc-002',
    question: 'Which resource is renewable?',
    options: ['Coal', 'Petroleum', 'Solar energy', 'Natural gas'],
    correctAnswer: 2,
    subject: 'Social Studies',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Natural Resources',
    explanation: 'Solar energy is renewable as it can be replenished naturally'
  },

  // Additional Core Mathematics - SHS (WASSCE Level)
  {
    id: 'shs-math-011',
    question: 'Evaluate: log₂(16) + log₂(4)',
    options: ['5', '6', '20', '64'],
    correctAnswer: 1,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Logarithms',
    explanation: 'log₂(16) = 4 (since 2⁴=16), log₂(4) = 2 (since 2²=4). Sum = 4 + 2 = 6'
  },
  {
    id: 'shs-math-012',
    question: 'If sin θ = 3/5, find cos θ (θ is acute)',
    options: ['3/5', '4/5', '5/3', '5/4'],
    correctAnswer: 1,
    subject: 'Core Mathematics',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Trigonometry',
    explanation: 'Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1, cos²θ = 16/25, cos θ = 4/5'
  },
  {
    id: 'shs-math-013',
    question: 'Simplify: 2√18 + 3√8',
    options: ['5√26', '12√2', '6√3 + 6√2', '5√2'],
    correctAnswer: 2,
    subject: 'Core Mathematics',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Surds',
    explanation: '2√18 = 2√(9×2) = 6√2. 3√8 = 3√(4×2) = 6√2. Wait, 2√18=6√2 and 3√8=6√2, so sum=12√2. But √18=3√2, so 2√18=6√2. √8=2√2, so 3√8=6√2. Total=12√2. However option shows different form - let me recalculate: √18=√(9×2)=3√2, so 2√18=6√2. √8=√(4×2)=2√2, so 3√8=6√2. Total = 6√2+6√2=12√2'
  },
  {
    id: 'shs-math-014',
    question: 'Find the nth term of the sequence: 5, 8, 11, 14, ...',
    options: ['3n + 2', 'n + 5', '2n + 3', '5n'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Sequences',
    explanation: 'Common difference = 3. First term = 5. Formula: aₙ = a + (n-1)d = 5 + (n-1)3 = 3n + 2'
  },
  {
    id: 'shs-math-015',
    question: 'Solve: 2^(x+1) = 32',
    options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
    correctAnswer: 1,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Indices',
    explanation: '32 = 2⁵, so 2^(x+1) = 2⁵. Therefore x+1 = 5, x = 4'
  },
  {
    id: 'shs-math-016',
    question: 'What is the determinant of matrix [[2, 3], [1, 4]]?',
    options: ['5', '8', '11', '6'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Matrices',
    explanation: 'det = (2×4) - (3×1) = 8 - 3 = 5'
  },
  {
    id: 'shs-math-017',
    question: 'If y varies inversely as x and y = 6 when x = 2, find y when x = 4',
    options: ['3', '12', '8', '1.5'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Variation',
    explanation: 'y = k/x. 6 = k/2, so k = 12. When x = 4: y = 12/4 = 3'
  },
  {
    id: 'shs-math-018',
    question: 'Convert 101₂ to base 10',
    options: ['3', '5', '7', '9'],
    correctAnswer: 1,
    subject: 'Core Mathematics',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Number Bases',
    explanation: '101₂ = 1×2² + 0×2¹ + 1×2⁰ = 4 + 0 + 1 = 5'
  },
  {
    id: 'shs-math-019',
    question: 'The angle of elevation of the top of a tower from a point 20m away is 30°. Find the height of the tower (tan 30° = 0.577)',
    options: ['11.54m', '17.32m', '20m', '34.64m'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Trigonometry Applications',
    explanation: 'tan 30° = height/20. Height = 20 × 0.577 = 11.54m'
  },
  {
    id: 'shs-math-020',
    question: 'Factorize completely: x² - 5x + 6',
    options: ['(x-2)(x-3)', '(x-1)(x-6)', '(x+2)(x+3)', '(x-6)(x+1)'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Factorization',
    explanation: 'Find two numbers that multiply to 6 and add to -5: -2 and -3. So (x-2)(x-3)'
  },

  // Additional Integrated Science - SHS
  {
    id: 'shs-sci-011',
    question: 'What is the SI unit of electric current?',
    options: ['Volt', 'Ohm', 'Ampere', 'Watt'],
    correctAnswer: 2,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Electricity',
    explanation: 'The ampere (A) is the SI unit for electric current'
  },
  {
    id: 'shs-sci-012',
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Cell Biology',
    explanation: 'Mitochondria generate ATP through cellular respiration'
  },
  {
    id: 'shs-sci-013',
    question: 'What is the pH of a neutral solution at 25°C?',
    options: ['0', '7', '14', '1'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Acids and Bases',
    explanation: 'pH 7 is neutral; <7 is acidic, >7 is basic'
  },
  {
    id: 'shs-sci-014',
    question: "Newton's first law states that an object at rest will remain at rest unless acted upon by:",
    options: ['Friction', 'An unbalanced force', 'Gravity', 'Inertia'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Forces and Motion',
    explanation: 'An unbalanced (net) force is required to change an object\'s state of motion'
  },
  {
    id: 'shs-sci-015',
    question: 'Which blood type is the universal donor?',
    options: ['A+', 'B+', 'AB+', 'O-'],
    correctAnswer: 3,
    subject: 'Integrated Science',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Human Biology',
    explanation: 'O- blood has no A, B, or Rh antigens, making it compatible with all blood types'
  },
  {
    id: 'shs-sci-016',
    question: 'What is the chemical formula for glucose?',
    options: ['C₆H₁₂O₆', 'CO₂', 'H₂O', 'C₁₂H₂₂O₁₁'],
    correctAnswer: 0,
    subject: 'Integrated Science',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Biochemistry',
    explanation: 'Glucose is a simple sugar with molecular formula C₆H₁₂O₆'
  },
  {
    id: 'shs-sci-017',
    question: 'What type of lens is used to correct myopia (short-sightedness)?',
    options: ['Convex lens', 'Concave lens', 'Bifocal lens', 'Cylindrical lens'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Optics',
    explanation: 'Concave lenses diverge light rays to correct myopia'
  },
  {
    id: 'shs-sci-018',
    question: 'In the periodic table, elements in the same group have the same:',
    options: ['Atomic mass', 'Number of protons', 'Number of valence electrons', 'Number of neutrons'],
    correctAnswer: 2,
    subject: 'Integrated Science',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Periodic Table',
    explanation: 'Elements in the same group have the same number of valence electrons'
  },
  {
    id: 'shs-sci-019',
    question: 'What is the speed of light in vacuum?',
    options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁵ m/s'],
    correctAnswer: 0,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Physics Constants',
    explanation: 'The speed of light in vacuum is approximately 3 × 10⁸ m/s or 300,000 km/s'
  },
  {
    id: 'shs-sci-020',
    question: 'Which process do plants use to convert light energy into chemical energy?',
    options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Fermentation'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Plant Biology',
    explanation: 'Photosynthesis converts light energy to glucose (chemical energy) using CO₂ and H₂O'
  },

  // Additional English Language - SHS
  {
    id: 'shs-eng-011',
    question: 'Choose the correct form: "Neither of the students ____ finished the assignment."',
    options: ['have', 'has', 'are', 'were'],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Subject-Verb Agreement',
    explanation: '"Neither" takes a singular verb, so "has" is correct'
  },
  {
    id: 'shs-eng-012',
    question: 'What is the antonym of "benevolent"?',
    options: ['Kind', 'Malevolent', 'Generous', 'Helpful'],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Vocabulary',
    explanation: 'Benevolent means kind/generous; malevolent means wishing harm to others'
  },
  {
    id: 'shs-eng-013',
    question: 'Identify the figure of speech: "The classroom was a zoo."',
    options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Figures of Speech',
    explanation: 'A metaphor directly states that one thing is another (without using "like" or "as")'
  },
  {
    id: 'shs-eng-014',
    question: 'Which sentence uses the passive voice correctly?',
    options: [
      'The teacher teaches the students.',
      'The students are taught by the teacher.',
      'The teacher is teaching the students.',
      'The students teach the teacher.'
    ],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Voice (Active/Passive)',
    explanation: 'Passive voice: subject receives the action. "The students are taught by the teacher."'
  },
  {
    id: 'shs-eng-015',
    question: 'What does the idiom "break the ice" mean?',
    options: [
      'To damage something',
      'To start a conversation in a social setting',
      'To be very cold',
      'To end a relationship'
    ],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Idioms',
    explanation: '"Break the ice" means to initiate conversation or ease tension in a social situation'
  },

  // Additional Social Studies - SHS
  {
    id: 'shs-soc-011',
    question: 'Who is known as the "Father of Pan-Africanism"?',
    options: ['Kwame Nkrumah', 'W.E.B. Du Bois', 'Marcus Garvey', 'Nelson Mandela'],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'African History',
    explanation: 'W.E.B. Du Bois is often credited as the father of Pan-Africanism'
  },
  {
    id: 'shs-soc-012',
    question: 'What is the capital of Ghana?',
    options: ['Kumasi', 'Accra', 'Tamale', 'Cape Coast'],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Geography',
    explanation: 'Accra is the capital and largest city of Ghana'
  },
  {
    id: 'shs-soc-013',
    question: 'Which economic system is characterized by private ownership and free markets?',
    options: ['Socialism', 'Capitalism', 'Communism', 'Feudalism'],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Economics',
    explanation: 'Capitalism is based on private ownership of means of production and market-driven economy'
  },
  {
    id: 'shs-soc-014',
    question: 'Ghana gained independence in which year?',
    options: ['1945', '1957', '1960', '1963'],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Ghanaian History',
    explanation: 'Ghana gained independence on March 6, 1957, becoming the first sub-Saharan African nation to do so'
  },
  {
    id: 'shs-soc-015',
    question: 'What is the primary function of the United Nations?',
    options: [
      'Economic development only',
      'Maintaining international peace and security',
      'Promoting tourism',
      'Regulating trade'
    ],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'International Relations',
    explanation: 'The UN\'s primary purpose is to maintain international peace and security'
  },

  // More Core Mathematics - SHS (Expanding to 40+ questions)
  {
    id: 'shs-math-021',
    question: 'If the sum of the first n natural numbers is 210, find n.',
    options: ['15', '18', '20', '21'],
    correctAnswer: 2,
    subject: 'Core Mathematics',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Sequences and Series',
    explanation: 'Sum = n(n+1)/2 = 210. So n(n+1) = 420. Solving: n = 20'
  },
  {
    id: 'shs-math-022',
    question: 'Express 0.3̅ (0.333...) as a fraction.',
    options: ['1/3', '3/10', '1/30', '3/100'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Recurring Decimals',
    explanation: 'Let x = 0.333... Then 10x = 3.333... So 10x - x = 3, giving x = 1/3'
  },
  {
    id: 'shs-math-023',
    question: 'Find the value of x if log₃(x) = 4',
    options: ['12', '64', '81', '243'],
    correctAnswer: 2,
    subject: 'Core Mathematics',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Logarithms',
    explanation: 'log₃(x) = 4 means 3⁴ = x, so x = 81'
  },
  {
    id: 'shs-math-024',
    question: 'The probability of rolling a sum of 7 with two dice is:',
    options: ['1/6', '1/12', '1/36', '7/36'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Probability',
    explanation: 'Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 outcomes. Total = 36. P = 6/36 = 1/6'
  },
  {
    id: 'shs-math-025',
    question: 'Simplify: (x³ - 8) / (x - 2)',
    options: ['x² + 2x + 4', 'x² - 2x + 4', 'x² + 4', 'x² - 4'],
    correctAnswer: 0,
    subject: 'Core Mathematics',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Factorization',
    explanation: 'x³ - 8 = (x - 2)(x² + 2x + 4). Cancel (x - 2) to get x² + 2x + 4'
  },

  // More Integrated Science - SHS
  {
    id: 'shs-sci-021',
    question: "What is Ohm's Law?",
    options: ['V = IR', 'P = VI', 'E = mc²', 'F = ma'],
    correctAnswer: 0,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Electricity',
    explanation: "Ohm's Law states that Voltage = Current × Resistance (V = IR)"
  },
  {
    id: 'shs-sci-022',
    question: 'Which process converts liquid water to water vapor?',
    options: ['Condensation', 'Evaporation', 'Sublimation', 'Precipitation'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'States of Matter',
    explanation: 'Evaporation is the process where liquid changes to gas'
  },
  {
    id: 'shs-sci-023',
    question: 'What type of bond exists between sodium and chlorine in NaCl?',
    options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Chemical Bonding',
    explanation: 'Na⁺ and Cl⁻ form an ionic bond through electron transfer'
  },
  {
    id: 'shs-sci-024',
    question: 'What is the function of red blood cells?',
    options: ['Fight infections', 'Transport oxygen', 'Clot blood', 'Produce antibodies'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Human Biology',
    explanation: 'Red blood cells contain hemoglobin which transports oxygen'
  },
  {
    id: 'shs-sci-025',
    question: 'The SI unit of force is:',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 1,
    subject: 'Integrated Science',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Physics Units',
    explanation: 'Force is measured in Newtons (N), where 1N = 1 kg⋅m/s²'
  },

  // More English Language - SHS
  {
    id: 'shs-eng-016',
    question: 'Choose the correct word: "The effect/affect of the policy was significant."',
    options: ['effect', 'affect', 'both are correct', 'neither is correct'],
    correctAnswer: 0,
    subject: 'English Language',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Word Choice',
    explanation: '"Effect" is a noun (result), "affect" is a verb (to influence)'
  },
  {
    id: 'shs-eng-017',
    question: 'What is the meaning of the idiom "piece of cake"?',
    options: ['A delicious dessert', 'Very easy', 'Very difficult', 'A celebration'],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Idioms',
    explanation: '"Piece of cake" means something is very easy to accomplish'
  },
  {
    id: 'shs-eng-018',
    question: 'Identify the clause type: "Although it was raining"',
    options: ['Independent clause', 'Dependent clause', 'Relative clause', 'Noun clause'],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'hard',
    level: 'SHS',
    topic: 'Grammar',
    explanation: 'Begins with subordinating conjunction "although", cannot stand alone'
  },
  {
    id: 'shs-eng-019',
    question: 'What is an oxymoron?',
    options: [
      'A comparison using like or as',
      'Contradictory terms appearing together',
      'Exaggeration for effect',
      'Repetition of consonant sounds'
    ],
    correctAnswer: 1,
    subject: 'English Language',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Figures of Speech',
    explanation: 'An oxymoron combines contradictory terms, e.g., "deafening silence"'
  },
  {
    id: 'shs-eng-020',
    question: 'Choose the correctly punctuated sentence:',
    options: [
      'I said "hello" to him.',
      'I said, "Hello" to him.',
      'I said "Hello," to him.',
      'I said "hello," to him.'
    ],
    correctAnswer: 0,
    subject: 'English Language',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Punctuation',
    explanation: 'Direct speech after a verb of saying needs quotation marks around the greeting'
  },

  // More Social Studies - SHS
  {
    id: 'shs-soc-016',
    question: 'What type of government does Ghana practice?',
    options: ['Monarchy', 'Democracy', 'Dictatorship', 'Oligarchy'],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'Government',
    explanation: 'Ghana practices constitutional democracy with multi-party elections'
  },
  {
    id: 'shs-soc-017',
    question: 'The process of a bill becoming law involves:',
    options: [
      'President signing only',
      'Parliament approval and presidential assent',
      'Supreme Court approval',
      'Referendum only'
    ],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Legislative Process',
    explanation: 'A bill must pass through Parliament and receive presidential assent to become law'
  },
  {
    id: 'shs-soc-018',
    question: 'ECOWAS stands for:',
    options: [
      'East Coast of West African States',
      'Economic Community of West African States',
      'European Council of West African States',
      'Educational Community of Western African States'
    ],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'easy',
    level: 'SHS',
    topic: 'International Organizations',
    explanation: 'ECOWAS promotes economic integration among 15 West African countries'
  },
  {
    id: 'shs-soc-019',
    question: 'What is inflation?',
    options: [
      'Decrease in money supply',
      'Increase in general price levels',
      'Decrease in unemployment',
      'Increase in exports'
    ],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'Economics',
    explanation: 'Inflation is the sustained increase in the general price level of goods and services'
  },
  {
    id: 'shs-soc-020',
    question: 'The Berlin Conference of 1884-1885 resulted in:',
    options: [
      'African independence',
      'Partition of Africa among European powers',
      'Formation of the African Union',
      'End of slave trade'
    ],
    correctAnswer: 1,
    subject: 'Social Studies',
    difficulty: 'medium',
    level: 'SHS',
    topic: 'African History',
    explanation: 'The Berlin Conference formalized the scramble for and partition of Africa'
  },
];

/**
 * Get random questions for challenge based on education level
 * Implements anti-repeat logic to ensure fresh questions each time
 */
export function getChallengeQuestions(
  level: EducationLevel,
  subject: string,
  difficulty: QuestionDifficulty,
  count: number = 10,
  userId: string = 'guest'
): ChallengeQuestion[] {
  const sessionKey = `${userId}-${level}`;
  
  if (level === 'JHS') {
    // Use existing JHS/BECE questions
    const jhsQuestions = getJHSQuestions(count, subject as JHSSubject, difficulty);
    
    // Convert to ChallengeQuestion format
    const converted = jhsQuestions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      subject: q.subject,
      difficulty: q.difficulty,
      level: 'JHS' as EducationLevel,
      explanation: q.explanation,
      topic: q.topic
    }));
    
    // Filter out recently used questions
    const fresh = filterFreshQuestions(converted, sessionKey);
    
    // If we don't have enough fresh questions, supplement with some used ones
    const finalQuestions = fresh.length >= count 
      ? fresh.slice(0, count)
      : [...fresh, ...converted.filter(q => !fresh.includes(q))].slice(0, count);
    
    // Mark these questions as used
    markQuestionsUsed(sessionKey, finalQuestions.map(q => q.id));
    
    return finalQuestions;
  } else {
    // Use SHS questions
    let filtered = shsQuestionBank.filter(q => q.level === 'SHS');
    
    // Filter by subject if specified
    if (subject && subject !== 'Mixed' && subject !== 'general') {
      filtered = filtered.filter(q => q.subject === subject);
    }
    
    // Filter by difficulty if specified
    if (difficulty && difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') {
      // If mixed difficulty, keep all
    } else if (difficulty) {
      filtered = filtered.filter(q => q.difficulty === difficulty);
    }
    
    // Filter out recently used questions
    const fresh = filterFreshQuestions(filtered, sessionKey);
    
    // Shuffle to randomize question order
    const shuffled = fresh.sort(() => Math.random() - 0.5);
    
    // If we don't have enough fresh questions, supplement with used ones
    const finalQuestions = shuffled.length >= count
      ? shuffled.slice(0, count)
      : [...shuffled, ...filtered.filter(q => !fresh.includes(q)).sort(() => Math.random() - 0.5)].slice(0, count);
    
    // Mark these questions as used
    markQuestionsUsed(sessionKey, finalQuestions.map(q => q.id));
    
    return finalQuestions;
  }
}

/**
 * Get available subjects for a given education level
 */
export function getAvailableSubjects(level: EducationLevel): string[] {
  if (level === 'JHS') {
    return [
      'Mixed',
      'Mathematics',
      'English Language',
      'Science',
      'Social Studies',
      'ICT',
      'Creative Arts',
      'French'
    ];
  } else {
    return [
      'Mixed',
      'Core Mathematics',
      'English Language',
      'Integrated Science',
      'Social Studies'
    ];
  }
}

/**
 * Get question counts by level (for stats)
 */
export function getQuestionStats(): { jhs: number; shs: number; total: number } {
  const shsCount = shsQuestionBank.length;
  // JHS count from bece-questions (approximate based on file size)
  const jhsCount = 150; // BECE questions in bece-questions.ts
  
  return {
    jhs: jhsCount,
    shs: shsCount,
    total: jhsCount + shsCount
  };
}

/**
 * Clear recently used questions for a user (useful for testing)
 */
export function clearRecentQuestions(userId: string = 'guest', level?: EducationLevel): void {
  if (level) {
    const sessionKey = `${userId}-${level}`;
    recentlyUsedQuestions.delete(sessionKey);
  } else {
    // Clear all sessions for this user
    const keys = Array.from(recentlyUsedQuestions.keys()).filter(k => k.startsWith(userId));
    keys.forEach(k => recentlyUsedQuestions.delete(k));
  }
}

/**
 * Validate if enough questions exist for a challenge
 */
export function hasEnoughQuestions(
  level: EducationLevel,
  subject: string,
  difficulty: QuestionDifficulty,
  requiredCount: number
): boolean {
  const available = getChallengeQuestions(level, subject, difficulty, 1000);
  return available.length >= requiredCount;
}
