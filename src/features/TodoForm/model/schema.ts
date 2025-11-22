import * as z from 'zod';

export const MIN_TITLE_LENGTH = 3;
export const MAX_TITLE_LENGTH = 128;
export const MAX_DESCRIPTION_LENGTH = 255;

export const schema = z.object({
  title: z
    .string()
    .min(MIN_TITLE_LENGTH, `Min title length is ${MIN_TITLE_LENGTH}`)
    .max(MAX_TITLE_LENGTH, `Max title length is ${MAX_TITLE_LENGTH}`),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH, `Max description length is ${MAX_DESCRIPTION_LENGTH}`),
  isDone: z.boolean(),
});
