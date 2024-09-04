'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Check() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500">
            Welcome Back to Anonymous Feedback
          </h1>
          <p className="mb-4 text-gray-300">Are you an Individual or an Organization?</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='w-full p-2'>
            <Link href="/sign-up">
              <Button className="w-full p-6 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-full hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-all">
                Individual
              </Button>
            </Link>
          </div>
          <div className='w-full p-2'>
            <Link href="/org-sign-up">
              <Button className="w-full p-6 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-full hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-all">
                Organization
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
