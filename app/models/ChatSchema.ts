import * as z from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(2, { message: "Content must be at least 2 characters long." })
    .max(150, { message: "Content must not exceed 150 characters." }),
  img_url: z
    .string()
    .url({ message: "Invalid URL format for the image." })
    .nullable()
    .or(z.literal("")),
  video_url: z
    .string()
    .url({ message: "Invalid URL format for the video." })
    .nullable()
    .or(z.literal("")),
});

export type createPostSchema = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
  content: z
    .string()
    .min(2, {
      message: "Content must be at-least 2 characters long",
    })
    .max(150, {
      message: "Content shouldn't not exceed more than 150 characters",
    })
    .optional()
    .nullable(),
  img_url: z.string().url().optional().nullable(),
  video_url: z.string().url().optional().nullable(),
});

export type updatePostSchema = z.infer<typeof updatePostSchema>;

export const readSinglePostSchema = z.object({
  chatId: z.number(),
});

export type readSinglePostSchema = z.infer<typeof readSinglePostSchema>;

export const deletePostSchema = z.object({
  chatId: z.number(),
});

export type deletePostSchema = z.infer<typeof deletePostSchema>;
