"use client";

import { useRouter } from 'next/navigation';
import AuthForm from '../../components/AuthForm';
import { authApi } from '../../lib/api';
import { setSession } from '../../lib/auth';

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (payload: { name?: string; email: string; password: string }) => {
    const response = await authApi.post('/register', payload);
    const { user } = response.data.data;
    setSession({ user });
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <AuthForm mode="register" onSubmit={handleSubmit} />
    </div>
  );
}