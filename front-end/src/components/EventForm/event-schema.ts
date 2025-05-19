import * as z from 'zod';

export const schema = z.object({
    title: z.string().min(2, {message: "Please enter a title"}),
    location: z.string().min(2, {message: "Please enter a location"}),
    eventDate: z.string()
});

export type EventFormData = z.infer<typeof schema>;
