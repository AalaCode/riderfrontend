import { z } from "zod";

/** Validation schema for the login form — kept in one place so the rules
 * can't drift between the form and any other place that might need them. */
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
