'use server';

/**
 * @fileOverview An AI agent that resolves customer's free-text request for items not listed in the standard shop inventory into available items from local shops.
 *
 * - resolveCustomRequest - A function that handles the resolution of custom item requests.
 * - ResolveCustomRequestInput - The input type for the resolveCustomRequest function.
 * - ResolveCustomRequestOutput - The return type for the resolveCustomRequest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResolveCustomRequestInputSchema = z.object({
  request: z.string().describe('The customer\u0027s free-text request for items.'),
});
export type ResolveCustomRequestInput = z.infer<typeof ResolveCustomRequestInputSchema>;

const ResolveCustomRequestOutputSchema = z.object({
  items:
    z.array(z.string())
      .describe('A list of available items that match the customer\u0027s request.'),
  shopRecommendations:
    z.array(z.string()).describe('A list of recommended shops that likely carry the requested items.'),
});
export type ResolveCustomRequestOutput = z.infer<typeof ResolveCustomRequestOutputSchema>;

export async function resolveCustomRequest(
  input: ResolveCustomRequestInput
): Promise<ResolveCustomRequestOutput> {
  return resolveCustomRequestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resolveCustomRequestPrompt',
  input: {schema: ResolveCustomRequestInputSchema},
  output: {schema: ResolveCustomRequestOutputSchema},
  prompt: `You are an AI assistant that helps resolve customer requests for items not listed in the standard shop inventory.  You will return a list of items, and a list of shop recommendations that likely carry the requested items.

Customer Request: {{{request}}}`,
});

const resolveCustomRequestFlow = ai.defineFlow(
  {
    name: 'resolveCustomRequestFlow',
    inputSchema: ResolveCustomRequestInputSchema,
    outputSchema: ResolveCustomRequestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
