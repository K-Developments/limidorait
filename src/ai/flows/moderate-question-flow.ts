
'use server';

/**
 * @fileOverview A Genkit flow to moderate user-submitted questions.
 *
 * - moderateQuestion - A function that checks if a question is appropriate.
 * - ModerateQuestionOutput - The return type for the moderation flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ModerateQuestionOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the question is considered safe and not spam/scam.'),
  reason: z.string().optional().describe('The reason for flagging the question, if applicable.'),
});
export type ModerateQuestionOutput = z.infer<typeof ModerateQuestionOutputSchema>;

const moderationPrompt = ai.definePrompt({
    name: 'moderationPrompt',
    input: { schema: z.string() },
    output: { schema: ModerateQuestionOutputSchema },
    prompt: `You are a content moderator for a digital agency's website. Your task is to determine if a user-submitted question is safe and appropriate.

    Analyze the following question: "{{{prompt}}}"

    A question is considered UNSAFE if it contains any of the following:
    - Spam (e.g., "buy viagra now", "make money fast")
    - Scams (e.g., phishing attempts, requests for personal financial information)
    - Hate speech or harassment
    - Profanity or explicit content
    - Gibberish or nonsensical text

    If the question is safe and seems like a legitimate inquiry for a digital agency (related to services, projects, careers, etc.), set isSafe to true.
    
    If the question is unsafe, set isSafe to false and provide a brief reason.`,
    config: {
        temperature: 0.1, // Use a low temperature for classification tasks
    },
});

const moderationFlow = ai.defineFlow(
  {
    name: 'moderationFlow',
    inputSchema: z.string(),
    outputSchema: z.boolean(),
  },
  async (question) => {
    const { output } = await moderationPrompt(question);
    if (!output) {
      // Default to safe if the model fails to respond
      return true;
    }
    return output.isSafe;
  }
);


export async function moderateQuestion(question: string): Promise<boolean> {
    return moderationFlow(question);
}
