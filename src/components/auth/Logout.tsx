'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react'; // Ya jo bhi aapka next-auth import path ho

export default function LogoutButton() {
  const queryClient = useQueryClient();

  // NextAuth ka signOut trigger karne ke liye mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // NextAuth ka signOut call karein aur redirect ko handle karein
      await signOut({ 
        callbackUrl: '/login', // Logout ke baad redirect kahan karna hai
        redirect: true 
      });
    },
    onMutate: () => {
      // Signout hone se pehle hi React Query ka poora cache clear kar dein
      // Taake sensitive data browser memory se foran khatam ho jaye
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    }
  });

  return (
    <button
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
    >
      {logoutMutation.isPending ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
