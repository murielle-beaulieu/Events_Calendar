import * as z from 'zod';

export const schema = z.object({
    name: z.string().min(2, {message: "Please enter a label name"})
});

export type LabelFormData = z.infer<typeof schema>;
