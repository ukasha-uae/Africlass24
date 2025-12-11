// Primary School Data for Ghana Education Service Curriculum
import type { Lesson, Topic } from '@/lib/types';
import {
  Book,
  Calculator,
  FlaskConical,
  Globe,
  Palette,
} from 'lucide-react';

interface PrimaryTopic extends Topic {
  gradeLevel: string;
}

interface PrimarySubject {
  id: string;
  slug: string;
  name: string;
  icon: any;
  description: string;
  topics: PrimaryTopic[];
}

export const primarySubjects: PrimarySubject[] = [
  {
    id: 'primary-english',
    slug: 'english',
    name: 'English Language',
    icon: Book,
    description: 'Reading, Writing, and Communication',
    topics: [
      {
        id: 'eng-p1-1',
        slug: 'alphabet',
        title: 'Alphabet & Phonics',
        gradeLevel: 'Class 1',
        lessons: [
          {
            id: 'eng-p1-1-1',
            slug: 'alphabets',
            title: 'Learning the Alphabets',
            objectives: ['Recognize letters A-Z', 'Write letters correctly', 'Know letter sounds'],
            introduction: 'The alphabet has 26 letters. Let us learn them!',
            keyConcepts: [
              { title: 'ABC Song', content: 'A-B-C-D-E-F-G, H-I-J-K-L-M-N-O-P, Q-R-S-T-U-V, W-X-Y-Z' },
              { title: 'Letter Sounds', content: 'A says /a/ as in apple, B says /b/ as in ball' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'You learned all 26 letters!',
          },
        ],
      },
      {
        id: 'eng-p2-1',
        slug: 'reading',
        title: 'Reading Simple Words',
        gradeLevel: 'Class 2',
        lessons: [
          {
            id: 'eng-p2-1-1',
            slug: 'simple-words',
            title: 'Reading Simple Words',
            objectives: ['Read 3-letter words', 'Blend sounds together'],
            introduction: 'Let us learn to read simple words!',
            keyConcepts: [
              { title: 'CVC Words', content: 'cat, dog, mat, pen, sun' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'You can read simple words now!',
          },
        ],
      },
      {
        id: 'eng-p3-1',
        slug: 'grammar',
        title: 'Basic Grammar',
        gradeLevel: 'Class 3',
        lessons: [
          {
            id: 'eng-p3-1-1',
            slug: 'nouns',
            title: 'Nouns',
            objectives: ['Identify nouns', 'Use nouns in sentences'],
            introduction: 'Nouns are naming words!',
            keyConcepts: [
              { title: 'What are Nouns?', content: 'Nouns name people, places, animals, things. Examples: boy, school, cat, book' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'Nouns are naming words!',
          },
        ],
      },
    ],
  },
  {
    id: 'primary-math',
    slug: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    description: 'Numbers and Problem Solving',
    topics: [
      {
        id: 'math-p1-1',
        slug: 'counting',
        title: 'Counting 1-10',
        gradeLevel: 'Class 1',
        lessons: [
          {
            id: 'math-p1-1-1',
            slug: 'numbers-1-10',
            title: 'Numbers 1 to 10',
            objectives: ['Count from 1 to 10', 'Write numbers 1-10'],
            introduction: 'Let us learn to count!',
            keyConcepts: [
              { title: 'Counting', content: 'One (1), Two (2), Three (3), Four (4), Five (5)' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'You can count 1 to 10!',
          },
        ],
      },
      {
        id: 'math-p2-1',
        slug: 'addition',
        title: 'Simple Addition',
        gradeLevel: 'Class 2',
        lessons: [
          {
            id: 'math-p2-1-1',
            slug: 'adding',
            title: 'Adding Numbers',
            objectives: ['Add numbers up to 10', 'Use + symbol'],
            introduction: 'Addition means putting together!',
            keyConcepts: [
              { title: 'Addition', content: '2 + 3 = 5, 1 + 1 = 2, 4 + 2 = 6' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'You can add numbers!',
          },
        ],
      },
      {
        id: 'math-p3-1',
        slug: 'multiplication',
        title: 'Times Tables',
        gradeLevel: 'Class 3',
        lessons: [
          {
            id: 'math-p3-1-1',
            slug: 'times-2',
            title: '2 Times Table',
            objectives: ['Learn 2 times table', 'Multiply by 2'],
            introduction: 'Let us learn the 2 times table!',
            keyConcepts: [
              { title: '2 Times', content: '2×1=2, 2×2=4, 2×3=6, 2×4=8, 2×5=10' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'You know the 2 times table!',
          },
        ],
      },
      {
        id: 'math-p4-1',
        slug: 'division',
        title: 'Simple Division',
        gradeLevel: 'Class 4',
        lessons: [
          {
            id: 'math-p4-1-1',
            slug: 'sharing',
            title: 'Sharing Equally',
            objectives: ['Understand division', 'Divide numbers'],
            introduction: 'Division is sharing equally!',
            keyConcepts: [
              { title: 'Division', content: '6÷2=3, 10÷5=2, 8÷4=2' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'You can divide numbers!',
          },
        ],
      },
    ],
  },
  {
    id: 'primary-science',
    slug: 'science',
    name: 'Science',
    icon: FlaskConical,
    description: 'Exploring Our World',
    topics: [
      {
        id: 'sci-p1-1',
        slug: 'senses',
        title: 'Our Five Senses',
        gradeLevel: 'Class 1',
        lessons: [
          {
            id: 'sci-p1-1-1',
            slug: 'five-senses',
            title: 'The Five Senses',
            objectives: ['Name the five senses', 'Identify body parts'],
            introduction: 'We use our senses to learn!',
            keyConcepts: [
              { title: 'Senses', content: 'Sight-Eyes, Hearing-Ears, Smell-Nose, Taste-Tongue, Touch-Skin' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'We have five senses!',
          },
        ],
      },
      {
        id: 'sci-p2-1',
        slug: 'living-things',
        title: 'Living Things',
        gradeLevel: 'Class 2',
        lessons: [
          {
            id: 'sci-p2-1-1',
            slug: 'living-non-living',
            title: 'Living and Non-Living',
            objectives: ['Identify living things', 'Know characteristics'],
            introduction: 'Living things grow and move!',
            keyConcepts: [
              { title: 'Living Things', content: 'They grow, need food, breathe, move. Examples: plants, animals, people' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'Living things need food and water!',
          },
        ],
      },
      {
        id: 'sci-p3-1',
        slug: 'water',
        title: 'Water',
        gradeLevel: 'Class 3',
        lessons: [
          {
            id: 'sci-p3-1-1',
            slug: 'uses-water',
            title: 'Uses of Water',
            objectives: ['List uses of water', 'Save water'],
            introduction: 'Water is very important!',
            keyConcepts: [
              { title: 'Water Uses', content: 'Drinking, cooking, bathing, washing, watering plants' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'We need water every day!',
          },
        ],
      },
    ],
  },
  {
    id: 'primary-social',
    slug: 'social-studies',
    name: 'Social Studies',
    icon: Globe,
    description: 'Our Community and Country',
    topics: [
      {
        id: 'social-p1-1',
        slug: 'family',
        title: 'My Family',
        gradeLevel: 'Class 1',
        lessons: [
          {
            id: 'social-p1-1-1',
            slug: 'family-members',
            title: 'Family Members',
            objectives: ['Name family members', 'Show love'],
            introduction: 'Family members love us!',
            keyConcepts: [
              { title: 'Family', content: 'Father, Mother, Brother, Sister, Grandfather, Grandmother' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'We love our families!',
          },
        ],
      },
      {
        id: 'social-p2-1',
        slug: 'school',
        title: 'Our School',
        gradeLevel: 'Class 2',
        lessons: [
          {
            id: 'social-p2-1-1',
            slug: 'school-people',
            title: 'People in School',
            objectives: ['Name school workers', 'Respect them'],
            introduction: 'Many people help us in school!',
            keyConcepts: [
              { title: 'School Workers', content: 'Headteacher, Teachers, Cooks, Cleaners' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'School workers help us learn!',
          },
        ],
      },
      {
        id: 'social-p3-1',
        slug: 'community',
        title: 'Our Community',
        gradeLevel: 'Class 3',
        lessons: [
          {
            id: 'social-p3-1-1',
            slug: 'helpers',
            title: 'Community Helpers',
            objectives: ['Name helpers', 'Know their jobs'],
            introduction: 'Helpers make our community better!',
            keyConcepts: [
              { title: 'Helpers', content: 'Doctor, Police, Firefighter, Farmer, Teacher' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'Community helpers keep us safe!',
          },
        ],
      },
      {
        id: 'social-p4-1',
        slug: 'ghana',
        title: 'Ghana Our Country',
        gradeLevel: 'Class 4',
        lessons: [
          {
            id: 'social-p4-1-1',
            slug: 'about-ghana',
            title: 'About Ghana',
            objectives: ['Know Ghana facts', 'Be proud'],
            introduction: 'Ghana is our country!',
            keyConcepts: [
              { title: 'Ghana', content: 'Capital: Accra. Independence: March 6, 1957. Colors: Red, Gold, Green' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'We are proud Ghanaians!',
          },
        ],
      },
    ],
  },
  {
    id: 'primary-arts',
    slug: 'creative-arts',
    name: 'Creative Arts',
    icon: Palette,
    description: 'Drawing, Music, and Crafts',
    topics: [
      {
        id: 'arts-p1-1',
        slug: 'colors',
        title: 'Colors',
        gradeLevel: 'Class 1',
        lessons: [
          {
            id: 'arts-p1-1-1',
            slug: 'basic-colors',
            title: 'Basic Colors',
            objectives: ['Name colors', 'Identify colors'],
            introduction: 'Colors are beautiful!',
            keyConcepts: [
              { title: 'Colors', content: 'Red, Yellow, Blue, Green, Orange, Purple' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'Colors make our world bright!',
          },
        ],
      },
      {
        id: 'arts-p2-1',
        slug: 'shapes',
        title: 'Shapes',
        gradeLevel: 'Class 2',
        lessons: [
          {
            id: 'arts-p2-1-1',
            slug: 'basic-shapes',
            title: 'Basic Shapes',
            objectives: ['Draw shapes', 'Name shapes'],
            introduction: 'Let us learn shapes!',
            keyConcepts: [
              { title: 'Shapes', content: 'Circle, Square, Triangle, Rectangle' },
            ],
            activities: { type: 'exercises', questions: [] },
            pastQuestions: [],
            summary: 'Shapes are everywhere!',
          },
        ],
      },
    ],
  },
];

export function getPrimarySubjectBySlug(slug: string): PrimarySubject | undefined {
  return primarySubjects.find(subject => subject.slug === slug);
}

export function getPrimarySubjectsByClass(className: string): PrimarySubject[] {
  if (className === 'All') {
    return primarySubjects;
  }
  
  return primarySubjects.map(subject => ({
    ...subject,
    topics: subject.topics.filter(topic => topic.gradeLevel === className),
  })).filter(subject => subject.topics.length > 0);
}
