'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ orgname: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<ApiResponse>(`/api/org-verify-code`, {
        orgname: params.orgname,
        code: data.code,
      });

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace('/org-sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Verification Failed',
        description:
          axiosError.response?.data.message ??
          'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500">
                    Verify Your Account
                </h1>
                <p className="mb-4 text-gray-300">Enter the verification code sent to your email</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="code"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-300">Verification Code</FormLabel>
                                <Input {...field} className="bg-gray-800 text-white" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full p-6 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-full hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-all'>
                        Verify
                    </Button>
                </form>
            </Form>
        </div>
    </div>
);
}
