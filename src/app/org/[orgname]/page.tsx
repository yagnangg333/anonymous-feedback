'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ orgname: string }>();
  const orgname = params.orgname;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-org-message', {
        ...data,
        orgname,
      });

      
      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error appropriately
    }
  };

  
  return (
    <div className="w-full max-w-4xl mx-auto my-1 p-6 bg-white rounded-lg shadow-2xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Public Profile Link of {orgname}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Send Anonymous Message to @{orgname}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none bg-gray-100 text-gray-900 border border-gray-400 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-lg px-6 py-3">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !messageContent}
                className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-lg px-6 py-3
                hover:bg-gradient-to-r hover:from-teal-500 hover:via-indigo-600 hover:to-purple-500 transition-colors duration-300"
              >
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>
  
      <div className="space-y-4 my-8">
        <div className="flex justify-between items-center space-y-2">
          <Button
            onClick={fetchSuggestedMessages}
            className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-lg px-6 py-3 hover:bg-gradient-to-r hover:from-teal-500 hover:via-indigo-600 hover:to-purple-500 transition-colors duration-300"
            disabled={isSuggestLoading}
          >
            Suggest Messages
          </Button>
          <p className="text-gray-800">Click on any message below to select it.</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Messages</h3>
          <div className="flex flex-col space-y-4">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-lg px-6 py-3 mb-2 hover:bg-gradient-to-r hover:from-teal-500 hover:via-indigo-600 hover:to-purple-500 transition-colors duration-300"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
      <Separator className="my-6 border-gray-200" />
      <div className="flex justify-between text-center">
        <div className="mb-4 font-bold text-gray-900">
          Get Your Message Board and start your anonymous Journey
        </div>
        <Link href={'/sign-up'}>
          <Button className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-lg px-6 py-3 hover:bg-gradient-to-r hover:from-teal-500 hover:via-indigo-600 hover:to-purple-500 transition-colors duration-300">
            Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  );   
}
