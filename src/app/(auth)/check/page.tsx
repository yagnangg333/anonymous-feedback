'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Check() {

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome Back to Anonymous Feedback
                    </h1>
                    <p className="mb-4">Are you Individual Or Organazation?</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='w-full p-2'>
                        <Link href="/sign-up">
                            <Button className="w-full p-6 bg-slate-100 text-black" variant={'outline'}>Individual</Button>
                        </Link>
                    </div>
                    <div className='w-full p-2'>
                        <Link href="/org-sign-up">
                            <Button className="w-full p-6 bg-slate-100 text-black" variant={'outline'}>Organazation</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
