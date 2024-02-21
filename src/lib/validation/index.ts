import { z } from 'zod';

export const SignupValidationSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	username: z.string().min(6).max(16),
	email: z.string().email(),
	password: z.string().min(6).max(18),
});

export const SigninValidationSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(18),
});

export const CreatePostValidationSchema = z.object({
	caption: z.string(),
	file: z.string(),
	location: z.string(),
	tags: z.string(),
});
