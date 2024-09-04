'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

// Define or import a schema for organization sign-in
const orgSignInSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function OrgSignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof orgSignInSchema>>({
    resolver: zodResolver(orgSignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof orgSignInSchema>) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast({
            title: 'Login Failed',
            description: 'Incorrect email or password',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
        }
      }

      if (result?.url) {
        router.replace('/org-dashboard');  // Adjust this to your organization dashboard route
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500">
            Welcome Back to Anonymous Feedback
          </h1>
          <p className="mb-4 text-gray-300">Sign in to manage your organization</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} className="bg-gray-800 text-white border border-gray-600" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} className="bg-gray-800 text-white border border-gray-600" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-full hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-all" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/check" className="text-teal-400 hover:text-teal-600 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
