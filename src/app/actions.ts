'use server';

import { resolveCustomRequest, ResolveCustomRequestInput, ResolveCustomRequestOutput } from '@/ai/flows/resolve-custom-request';
import { z } from 'zod';

const RequestSchema = z.object({
  request: z.string().min(3, 'Request must be at least 3 characters long.'),
});

interface FormState {
  message: string;
  data?: ResolveCustomRequestOutput | null;
  error?: boolean;
}

export async function handleCustomRequest(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validationResult = RequestSchema.safeParse({
    request: formData.get('request'),
  });

  if (!validationResult.success) {
    return {
      message: validationResult.error.errors.map((e) => e.message).join(', '),
      error: true,
    };
  }

  const input: ResolveCustomRequestInput = validationResult.data;

  try {
    const result = await resolveCustomRequest(input);
    if (!result.items || result.items.length === 0) {
        return {
            message: "We couldn't find any specific items for your request, but we have some shop suggestions!",
            data: result,
        }
    }
    return { message: 'We found some items for you!', data: result };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      message: `Failed to resolve request: ${error}`,
      error: true,
    };
  }
}
