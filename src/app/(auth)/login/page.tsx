"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes, LogIn } from "lucide-react";
import { FormInput } from "@/components/form/FormInput";
import { loginSchema, type LoginFormValues } from "@/features/auth/schema";
import { useLogin } from "@/features/auth/useLogin";
import Image from 'next/image';


/**
 * Login page. Public route (outside the (protected) group), so it renders
 * without going through ProtectedRoute.
 */
export default function LoginPage() {
  const { login, isSubmitting, formError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm rounded-box border border-base-300 bg-base-100 p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          {/* <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Boxes size={28} />
          </div> */}
            <Image 
        src="/icon/icon-192x192.png" 
        alt="Rider Admin Logo"
        width={50} // Apni marzi ki width dein
        height={30} // Apni marzi ki height dein
        priority // Agar yeh image page ke bilkul top par hay toh yeh lazmi lagayein
      />
          
          <h1 className="text-[24px] font-semibold text-[#27AE60]">MIRCHILI</h1>
         
        </div>

        <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4" noValidate>
          <FormInput
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            error={errors.email}
            {...register("email")}
          />
          <FormInput
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password}
            {...register("password")}
          />

          {formError && (
            <div role="alert" className="alert alert-error py-2 text-sm">
              <span>{formError}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-2 gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <LogIn size={16} />
            )}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
