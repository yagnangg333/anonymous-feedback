'use client';

import { OrgMessageCard } from '@/components/OrgMessageCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw, Share2 } from 'lucide-react';
// import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  console.log(session);
  

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    try {
      const response = await axios.get<ApiResponse>('/api/accept-org-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ??
          'Failed to fetch message settings',
        variant: 'destructive',
      });
    } finally {
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>('/api/get-org-messages');
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: 'Refreshed Messages',
            description: 'Showing latest messages',
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: 'Error',
          description:
            axiosError.response?.data.message ?? 'Failed to fetch messages',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages, toast]
  );

  // Fetch initial state from the server
  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();

    fetchAcceptMessages();
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);


  if (!session || !session.user) {
    return <div></div>;
  }

  console.log("Hi its session");
  
  console.log(session.user.name);
  

  const  username  = session.user.name; 
  

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/org/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Profile URL has been copied to clipboard.',
    });
  };

  const shareProfileUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${username}'s Profile`,
          text: 'Check out this profile!',
          url: profileUrl,
        });
        toast({
          title: 'Profile is being Shared!',
          description: 'Choose a platform to share.',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to share the profile URL.',
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'Share Not Supported',
        description: 'Web Share API is not supported in this browser.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-6xl">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
        {username}&apos;s Dashboard
      </h1>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 bg-gray-200 text-gray-700 border-gray-300 rounded-lg"
          />
          <Button
            onClick={copyToClipboard}
            className="ml-2 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-lg px-4 py-2 hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-colors duration-300"
          >
            Copy
          </Button>
          <Button
            onClick={shareProfileUrl}
            className="ml-2 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-lg px-4 py-2 hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-colors duration-300"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <Button
        className="mt-4 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-lg px-4 py-2 hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-colors duration-300"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <OrgMessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
