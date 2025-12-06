'use server';

/**
 * @fileOverview An adaptive quiz generation AI agent.
 *
 * - generateAdaptiveQuiz - A function that handles the quiz generation process based on user performance.
 * - AdaptiveQuizInput - The input type for the generateAdaptiveQuiz function.
 * - AdaptiveQuizOutput - The return type for the generateAdaptiveQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveQuizInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate the quiz.'),
  topic: z.string().describe('The specific topic within the subject.'),
  userPerformance: z
    .string()
    .describe(
      'A description of the user performance, including weak areas and areas of strength.'
    ),
  numberOfQuestions: z
    .number()
    .default(5)
    .describe('The number of questions to generate for the quiz.'),
});
export type AdaptiveQuizInput = z.infer<typeof AdaptiveQuizInputSchema>;

// Schema for a multiple-choice question
const MultipleChoiceQuestionSchema = z.object({
  type: z.literal('multiple-choice'),
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).describe('An array of 4 possible answer options.'),
  correctAnswer: z.string().describe('The correct answer from the options.'),
});

// Schema for a true/false question
const TrueFalseQuestionSchema = z.object({
    type: z.literal('true-false'),
    question: z.string().describe('A statement that is either true or false.'),
    correctAnswer: z.boolean().describe('Whether the statement is true or false.'),
});

// Union of all possible question types
const QuizQuestionSchema = z.union([
    MultipleChoiceQuestionSchema,
    TrueFalseQuestionSchema,
]);

const AdaptiveQuizOutputSchema = z.object({
  quizQuestions: z.array(QuizQuestionSchema).describe('An array of generated quiz questions of various types.'),
});
export type AdaptiveQuizOutput = z.infer<typeof AdaptiveQuizOutputSchema>;

export async function generateAdaptiveQuiz(input: AdaptiveQuizInput): Promise<AdaptiveQuizOutput> {
  return adaptiveQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptiveQuizPrompt',
  input: {schema: AdaptiveQuizInputSchema},
  output: {schema: AdaptiveQuizOutputSchema},
  prompt: `You are an expert educational content creator, skilled at creating engaging and varied quizzes for Junior High School students. Your task is to generate a quiz tailored to a student's specific needs.

  Subject: {{subject}}
  Topic: {{topic}}
  User Performance History: {{userPerformance}}
  Number of Questions: {{numberOfQuestions}}

  Based on the information provided, generate a quiz with the specified number of questions. The quiz should include a mix of question types to keep the student engaged. For now, please use 'multiple-choice' and 'true-false' question types. Ensure the questions accurately test the student's understanding of the topic, focusing more on areas of weakness described in the performance history.

  Format the output as a JSON object that conforms to the provided schemas.
  `,
});

const adaptiveQuizFlow = ai.defineFlow(
  {
    name: 'adaptiveQuizFlow',
    inputSchema: AdaptiveQuizInputSchema,
    outputSchema: AdaptiveQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
