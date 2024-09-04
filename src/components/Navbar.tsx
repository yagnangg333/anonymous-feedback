'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          Anonymous Feedback
        </Link>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user.username || user.email}
            </span>
            <Button 
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200 transition-all" 
              variant='outline'
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/check">
            <Button 
              className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200 transition-all" 
              variant={'outline'}
            >
              Register
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
