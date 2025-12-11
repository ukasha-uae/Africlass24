
import type { ReactNode } from 'react';
import React from 'react'; // Import React

export interface PastQuestionStep {
  title: string;
  explanation: ReactNode;
}

export interface PastQuestion {
  id: string;
  subject: 'Core Mathematics' | 'Integrated Science';
  topic: string;
  year: number;
  questionType: 'MCQ' | 'Theory' | 'Practical';
  question: ReactNode;
  steps: PastQuestionStep[];
  finalAnswer: ReactNode;
}

export const pastQuestions: PastQuestion[] = [
  // --- Core Mathematics ---
  {
    id: 'wassce-2018-p1-q1',
    subject: 'Core Mathematics',
    topic: 'Fractions, Decimals, and Percentages',
    year: 2018,
    questionType: 'Theory',
    question: "Arrange the fractions 2/3, 1/2, 3/5 in ascending order.",
    steps: [
        { title: "Step 1: Find a Common Denominator", explanation: "To compare fractions, we need a common denominator. The least common multiple (LCM) of 3, 2, and 5 is 30." },
        { title: "Step 2: Convert Each Fraction", explanation: "2/3 = (2×10)/(3×10) = 20/30.  1/2 = (1×15)/(2×15) = 15/30.  3/5 = (3×6)/(5×6) = 18/30." },
        { title: "Step 3: Compare the Numerators", explanation: "Now compare the new fractions: 15/30, 18/30, 20/30." },
        { title: "Step 4: Arrange in Ascending Order", explanation: "Based on the numerators, the order is 15/30 < 18/30 < 20/30. Therefore, the original fractions in order are 1/2, 3/5, 2/3." }
    ],
    finalAnswer: "The correct order is 1/2, 3/5, 2/3."
  },
  {
    id: 'wassce-2020-p2-q3b',
    subject: 'Core Mathematics',
    topic: 'Fractions, Decimals, and Percentages',
    year: 2020,
    questionType: 'Theory',
    question: "A student spent 1/4 of his money on books and 1/3 on transport. What fraction of his money is left?",
    steps: [
        { title: "Step 1: Find the Total Fraction Spent", explanation: "Add the fractions for books and transport: 1/4 + 1/3." },
        { title: "Step 2: Use a Common Denominator", explanation: "The LCM of 4 and 3 is 12. Convert the fractions: 1/4 = 3/12 and 1/3 = 4/12." },
        { title: "Step 3: Calculate the Total Spent", explanation: "Add the converted fractions: 3/12 + 4/12 = 7/12. The student spent 7/12 of his money." },
        { title: "Step 4: Calculate the Fraction Left", explanation: "Subtract the fraction spent from the whole (1 or 12/12): 12/12 - 7/12 = 5/12." }
    ],
    finalAnswer: "The fraction of his money left is 5/12."
  },
  {
    id: 'wassce-2018-p1-q11',
    subject: 'Core Mathematics',
    topic: 'Geometry of Lines and Angles',
    year: 2018,
    questionType: 'Theory',
    question: "Two angles on a straight line are 3x° and 2x°. Find x.",
    steps: [
        { title: "Step 1: Recall the Rule", explanation: "Angles on a straight line add up to 180°." },
        { title: "Step 2: Set up the equation", explanation: "Based on the rule, we can write the equation: 3x + 2x = 180." },
        { title: "Step 3: Combine like terms", explanation: "Combine the 'x' terms on the left side: 5x = 180." },
        { title: "Step 4: Solve for x", explanation: "Divide both sides by 5 to find the value of x: x = 180 / 5." }
    ],
    finalAnswer: "The value of x is 36."
  },
  {
    id: 'wassce-2020-p2-q6',
    subject: 'Core Mathematics',
    topic: 'Geometry of Lines and Angles',
    year: 2020,
    questionType: 'Theory',
    question: "A transversal cuts two parallel lines. If one alternate angle is 68°, find the other.",
    steps: [
        { title: "Step 1: Recall the Rule for Alternate Angles", explanation: "When a transversal intersects two parallel lines, the alternate interior angles are equal." },
        { title: "Step 2: Apply the Rule", explanation: "Since one alternate angle is given as 68°, the other alternate angle must also be 68°." }
    ],
    finalAnswer: "The other alternate angle is 68°."
  },
  {
    id: 'wassce-2020-p1-q13',
    subject: 'Core Mathematics',
    topic: 'Factors, Multiples, and Divisibility',
    year: 2020,
    questionType: 'Theory',
    question: "Find the LCM of 8 and 12.",
    steps: [
        { title: "Step 1: List multiples of the first number.", explanation: "Multiples of 8: 8, 16, 24, 32, 40..." },
        { title: "Step 2: List multiples of the second number.", explanation: "Multiples of 12: 12, 24, 36, 48..." },
        { title: "Step 3: Identify the smallest number common to both lists.", explanation: "The first number to appear in both lists is 24." }
    ],
    finalAnswer: "The LCM of 8 and 12 is 24."
  },
  {
    id: 'wassce-2019-p1-q11',
    subject: 'Core Mathematics',
    topic: 'Factors, Multiples, and Divisibility',
    year: 2019,
    questionType: 'Theory',
    question: "Using prime factorization, find the HCF of 30 and 45.",
    steps: [
        { title: "Step 1: Find the prime factors of the first number.", explanation: "30 = 2 × 15 = 2 × 3 × 5" },
        { title: "Step 2: Find the prime factors of the second number.", explanation: "45 = 3 × 15 = 3 × 3 × 5" },
        { title: "Step 3: Identify the common prime factors.", explanation: "Both lists contain one '3' and one '5'." },
        { title: "Step 4: Multiply the common prime factors.", explanation: "Multiply the common factors together: 3 × 5 = 15." }
    ],
    finalAnswer: "The HCF of 30 and 45 is 15."
  },
  {
    id: 'wassce-2019-p1-q14',
    subject: 'Core Mathematics',
    topic: 'Linear Equations and Inequalities',
    year: 2019,
    questionType: 'Theory',
    question: "Solve the inequality: 2(x - 3) ≤ x + 4",
    steps: [
        { title: "Step 1: Expand the bracket", explanation: "Apply the distributive property on the left side: 2 * x = 2x, and 2 * -3 = -6. The inequality becomes: 2x - 6 ≤ x + 4." },
        { title: "Step 2: Group the x terms", explanation: "Subtract x from both sides to gather the variable terms on the left: 2x - x - 6 ≤ 4." },
        { title: "Step 3: Simplify the x terms", explanation: "The inequality is now: x - 6 ≤ 4." },
        { title: "Step 4: Isolate x", explanation: "Add 6 to both sides to solve for x: x ≤ 4 + 6." },
        { title: "Step 5: Final Answer", explanation: "The solution is x ≤ 10." }
    ],
    finalAnswer: "The solution is x ≤ 10."
  },
  {
    id: 'wassce-2019-p1-q18',
    subject: 'Core Mathematics',
    topic: 'Sets and Venn Diagrams',
    year: 2019,
    questionType: 'Theory',
    question: "If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, find A ∪ B and A ∩ B.",
    steps: [
        { title: "Step 1: Understand Union (∪)", explanation: "Union means we combine all elements from both sets, without repeating any." },
        { title: "Step 2: Calculate A ∪ B", explanation: "Take all elements from A: {1, 2, 3, 4}. Then add elements from B that are not already in the list: {5, 6}. The result is {1, 2, 3, 4, 5, 6}." },
        { title: "Step 3: Understand Intersection (∩)", explanation: "Intersection means we find only the elements that appear in BOTH sets." },
        { title: "Step 4: Calculate A ∩ B", explanation: "Compare A and B. The numbers '3' and '4' are in both sets. So, the intersection is {3, 4}." }
    ],
    finalAnswer: React.createElement('div', null, 'A ∪ B = {1, 2, 3, 4, 5, 6}', React.createElement('br'), 'A ∩ B = {3, 4}')
  },
  {
    id: 'wassce-2020-p1-q22',
    subject: 'Core Mathematics',
    topic: 'Sets and Venn Diagrams',
    year: 2020,
    questionType: 'Theory',
    question: "In a class of 40 students, 22 like Mathematics (M), 18 like Science (S), and 10 like both. How many students like neither subject?",
    steps: [
        { title: "Step 1: Find 'Only Mathematics'", explanation: "The number of students who like only Mathematics is the total who like Math minus those who like both: 22 - 10 = 12." },
        { title: "Step 2: Find 'Only Science'", explanation: "The number of students who like only Science is the total who like Science minus those who like both: 18 - 10 = 8." },
        { title: "Step 3: Find Total Who Like at Least One Subject", explanation: "The total number of students who like either subject or both is the sum of 'Only Math', 'Only Science', and 'Both': 12 + 8 + 10 = 30." },
        { title: "Step 4: Find 'Neither'", explanation: "Subtract the total number of students who like at least one subject from the total number of students in the class: 40 - 30 = 10." }
    ],
    finalAnswer: "10 students like neither subject."
  },
  {
    id: 'wassce-2021-p1-q17',
    subject: 'Core Mathematics',
    topic: 'Linear Equations and Inequalities',
    year: 2021,
    questionType: 'Theory',
    question: "Solve the equation: 3x + 7 = 2x + 12",
    steps: [
        { title: "Step 1: Group the x terms", explanation: "To get all the 'x' terms on one side, subtract 2x from both sides of the equation." },
        { title: "Step 2: Simplify both sides", explanation: "3x - 2x = x. So, the equation becomes: x + 7 = 12." },
        { title: "Step 3: Isolate x", explanation: "To get x by itself, subtract 7 from both sides." },
        { title: "Step 4: Final Answer", explanation: "12 - 7 = 5. Therefore, x = 5." }
    ],
    finalAnswer: "The solution is x = 5."
  },
   {
    id: 'waec-2014-prob-neither',
    subject: 'Core Mathematics',
    topic: 'Probability (Combined Events)',
    year: 2014,
    questionType: 'Theory',
    question: "The probability of an event P happening is 1/5 and that of event Q is 1/4. If the events are independent, what is the probability that neither of them happens?",
    steps: [
      {
        title: "Step 1: Find P(P′) and P(Q′)",
        explanation: "P(P′) = 1 − 1/5 = 4/5. P(Q′) = 1 − 1/4 = 3/4."
      },
      {
        title: "Step 2: Use multiplication rule",
        explanation: "P(neither happens) = P(P′ and Q′) = P(P′) × P(Q′) = 4/5 × 3/4 = 3/5."
      }
    ],
    finalAnswer: "3/5"
  },
  {
    id: 'ibo-2017-spinner',
    subject: 'Core Mathematics',
    topic: 'Probability (Combined Events)',
    year: 2017,
    questionType: 'Theory',
    question: "A fair spinner with sections labelled 1, 2, 3, 4, 5, 6 is spun twice. What is the probability the sum of the two spins is less than 6?",
    steps: [
      {
        title: "Step 1: List possible sums < 6",
        explanation: "Possible pairs: (1,1),(1,2),(1,3),(1,4),(2,1),(2,2),(2,3),(3,1),(3,2),(4,1). There are 10 favourable outcomes."
      },
      {
        title: "Step 2: Calculate total outcomes",
        explanation: "Total outcomes = 6 × 6 = 36."
      },
      {
        title: "Step 3: Compute probability",
        explanation: "P(sum < 6) = 10/36 = 5/18."
      }
    ],
    finalAnswer: "5/18"
  },
  {
    id: 'waec-2015-conditional-prob',
    subject: 'Core Mathematics',
    topic: 'Probability (Combined Events)',
    year: 2015,
    questionType: 'Theory',
    question: "The probability that it will snow tomorrow is 0.3. If it snows, the chance Chuck is late is 0.8. If not, chance of being late is 0.1. What is P(Chuck is late)?",
    steps: [
      {
        title: "Step 1: Build tree probabilities",
        explanation: "P(Snow) = 0.3 → P(Late|Snow) = 0.8. P(No Snow) = 0.7 → P(Late|No Snow) = 0.1."
      },
      {
        title: "Step 2: Find P(Late and Snow)",
        explanation: "0.3 × 0.8 = 0.24."
      },
      {
        title: "Step 3: Find P(Late and No Snow)",
        explanation: "0.7 × 0.1 = 0.07."
      },
      {
        title: "Step 4: Calculate total probability",
        explanation: "P(Late) = 0.24 + 0.07 = 0.31."
      }
    ],
    finalAnswer: "0.31"
  },
  {
    id: 'wassce-2018-p2-q3',
    subject: 'Core Mathematics',
    topic: 'Probability (Combined Events)',
    year: 2018,
    questionType: 'Theory',
    question: "A bag contains 5 red, 3 green, and 2 blue balls. If two balls are picked one after the other without replacement, find the probability that both are green.",
    steps: [
        { title: "Step 1: Calculate Total Balls", explanation: "Total balls = 5 + 3 + 2 = 10." },
        { title: "Step 2: Find Probability of First Green", explanation: "P(1st is green) = 3/10." },
        { title: "Step 3: Find Probability of Second Green (without replacement)", explanation: "After picking one green ball, 2 green balls and 9 total balls remain. P(2nd is green) = 2/9." },
        { title: "Step 4: Multiply the Probabilities", explanation: "P(Both Green) = (3/10) × (2/9) = 6/90 = 1/15." }
    ],
    finalAnswer: "The probability is 1/15."
  },

  // --- Integrated Science ---
  {
    id: 'wassce-2019-bio-p2-q4b',
    subject: 'Integrated Science',
    topic: 'Cell Structure and Function',
    year: 2019,
    questionType: 'Theory',
    question: "Name two differences between plant and animal cells.",
    steps: [
      { title: "Step 1: Recall Key Structures", explanation: "Think about the major organelles and structures. Which ones are unique to plants?" },
      { title: "Step 2: Identify Difference 1 (Structural)", explanation: "Plant cells have a rigid cell wall outside the cell membrane for support. Animal cells do not." },
      { title: "Step 3: Identify Difference 2 (Energy)", explanation: "Plant cells have chloroplasts to perform photosynthesis. Animal cells do not." },
      { title: "Step 4: (Optional) Identify Difference 3 (Storage)", explanation: "Plant cells typically have one large central vacuole for water storage. Animal cells have small, temporary vacuoles, if any." }
    ],
    finalAnswer: "1. Plant cells have a cell wall, animal cells do not. 2. Plant cells have chloroplasts, animal cells do not."
  },
  {
    id: 'wassce-2017-bio-p2-q4',
    subject: 'Integrated Science',
    topic: 'Cell Division (Mitosis and Meiosis)',
    year: 2017,
    questionType: 'Theory',
    question: "Differentiate between mitosis and meiosis under the following headings: (a) Number of division stages (b) Number of daughter cells produced (c) Genetic similarity of daughter cells (d) Site of occurrence in organisms (e) Significance",
    steps: [
      { title: "(a) Number of Divisions", explanation: "Mitosis involves one stage of division. Meiosis involves two consecutive stages (Meiosis I and Meiosis II)." },
      { title: "(b) Number of Daughter Cells", explanation: "Mitosis produces two daughter cells. Meiosis produces four daughter cells." },
      { title: "(c) Genetic Similarity", explanation: "Mitosis produces genetically identical daughter cells (clones). Meiosis produces genetically different daughter cells due to crossing over." },
      { title: "(d) Site of Occurrence", explanation: "Mitosis occurs in somatic (body) cells for growth and repair. Meiosis occurs in reproductive organs to form gametes (sex cells)." },
      { title: "(e) Significance", explanation: "Mitosis is significant for growth, repair of tissues, and asexual reproduction. Meiosis is significant for sexual reproduction and creating genetic variation." }
    ],
    finalAnswer: "Mitosis: 1 division, 2 identical cells, in body cells, for growth. Meiosis: 2 divisions, 4 varied cells, in reproductive organs, for sexual reproduction."
  },
  {
    id: 'wassce-2019-mcq-energy',
    subject: 'Integrated Science',
    topic: 'Energy Flow & Food Chains',
    year: 2019,
    questionType: 'MCQ',
    question: "Which statement about ecosystems is FALSE?",
    steps: [
      { title: "Analyze Option A", explanation: "Producers (plants) form the base of the food chain, providing energy for all consumers. This is TRUE." },
      { title: "Analyze Option B", explanation: "Autotrophs are producers. Food chains begin with them. This is TRUE." },
      { title: "Analyze Option C", explanation: "Energy transfer is inefficient; about 90% is lost as heat at each trophic level. Therefore, it is not 100% efficient. This statement is FALSE." },
      { title: "Analyze Option D", explanation: "Not all organisms are eaten, and some energy is used for life processes, so not all energy reaches decomposers. This is TRUE." }
    ],
    finalAnswer: "The false statement is C: Energy transfer is 100% efficient."
  }
];
