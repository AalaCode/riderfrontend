"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { LoginFormValues } from "@/features/auth/schema";

/**
 * Wraps NextAuth's `signIn("credentials", ...)` call with loading/error
 * state, so the login page component stays purely presentational.
 */
export function useLogin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function login(values: LoginFormValues) {
    setIsSubmitting(true);
    setFormError(null);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setFormError(result.error);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return { login, isSubmitting, formError };
}
