'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-4xl text-gray-300">
            Anonymous Feedback - Where your identity remains a secret.
          </p>
          <Link href="/check">
            <Button className="mt-6 px-6 py-3 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-full hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-colors duration-300">
              Get Started
            </Button>
          </Link>
        </section>

        <Carousel
          plugins={[Autoplay({ delay: 1500 })]}
          className="w-full max-w-lg md:max-w-2xl mt-5"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="shadow-lg border border-gray-700 bg-gray-800">
                  <CardHeader className="bg-gray-800 rounded-t-lg">
                    <CardTitle className="text-indigo-400">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0 text-indigo-400" size={24} />
                    <div>
                      <p className="text-gray-300">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* New Section for Steps */}
        <section className="w-full bg-gray-800 py-12 mt-20">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-8">
      How It Works
    </h2>
    {/* Steps Container */}
    <div className="space-y-12">
      {/* Step 1 */}
      <div className="flex flex-col md:flex-row-reverse items-center border border-indigo-600 p-5 rounded-md">
        <div className="md:w-1/2">
          <Image src="/images/LandingPage.png" alt="Step 1" width={500} height={300} className="rounded-md" layout="responsive"/>
        </div>
        <div className="md:w-1/2 text-center md:text-left p-4">
          <h3 className="text-xl font-semibold text-white mb-2">1. Landing Page</h3>
          <p className="text-gray-300">Explore The Page To Know About Our Page And Sign Up To Get Started.</p>
        </div>
      </div>
      {/* Step 2 */}
      <div className="flex flex-col md:flex-row items-center border border-indigo-600 p-5 rounded-md">
        <div className="md:w-1/2">
          <Image src="/images/options.png" alt="Step 2" width={500} height={300} className="rounded-md" layout="responsive"/>
        </div>
        <div className="md:w-1/2 text-center md:text-left p-4">
          <h3 className="text-xl font-semibold text-white mb-2">2. Which Option Best Describes Your Feedback Source?</h3>
          <p className="text-gray-300"><b>Individual</b>: If You Are Providing Feedback As An Individual, Such As Single User Or Customer.</p>
          <p className="text-gray-300">
          <b>Organization</b>: If You Are Representing a Company, Group, Or Any Organized Entity Providing Feedback.</p>
        </div>
      </div>
      {/* Step 3 */}
      <div className="flex flex-col md:flex-row-reverse items-center border border-indigo-600 p-5 rounded-md">
        <div className="md:w-1/2">
          <Image src="/images/DashBoard.png" alt="Step 3" width={500} height={300} className="rounded-md" layout="responsive"/>
        </div>
        <div className="md:w-1/2 text-center md:text-left p-4">
          <h3 className="text-xl font-semibold text-white mb-2">3. DashBoard</h3>
          <p className="text-gray-300">The UserDashboard page lets users manage their profile and messages. It includes features to copy or share a unique profile link, toggle message acceptance, and view or refresh messages.</p>
        </div>
      </div>
      {/* Step 4 */}
      <div className="flex flex-col md:flex-row items-center border border-indigo-600 p-5 rounded-md">
        <div className="md:w-1/2">
          <Image src="/images/MsgPortal.png" alt="Step 4" width={500} height={300} className="rounded-md" layout="responsive"/>
        </div>
        <div className="md:w-1/2 text-center md:text-left p-4">
          <h3 className="text-xl font-semibold text-white mb-2">4. Anonymous Message Portal</h3>
          <p className="text-gray-300">The page allows users to fetch and select from suggested anonymous messages. Users can click a button to get a list of suggested messages from an API.</p>
        </div>
      </div>
      {/* Step 5 */}
      <div className="flex flex-col md:flex-row-reverse items-center border border-indigo-600 p-5 rounded-md">
        <div className="md:w-1/2">
          <Image src="/images/WriteMsg.png" alt="Step 5" width={500} height={300} className="rounded-md" layout="responsive"/>
        </div>
        <div className="md:w-1/2 text-center md:text-left p-4">
          <h3 className="text-xl font-semibold text-white mb-2">5. Send Anonymous Message</h3>
          <p className="text-gray-300">After selecting a suggested message or writing their own, users can submit their anonymous message to a specified username. The page features a text area for composing messages and a submit button that becomes active only when a message is entered.</p>
        </div>
      </div>
      {/* Step 6 */}
      <div className="flex flex-col md:flex-row items-center border border-indigo-600 p-5 rounded-md">
        <div className="md:w-1/2">
          <Image src="/images/DashBoardUpdate.png" alt="Step 6" width={500} height={300} className="rounded-md" layout="responsive"/>
        </div>
        <div className="md:w-1/2 text-center md:text-left p-4">
          <h3 className="text-xl font-semibold text-white mb-2">6. Updated DashBoard</h3>
          <p className="text-gray-300">User can check for incoming messages by automatically or clicking the refresh button.</p>
        </div>
      </div>
      {/* Add more steps as needed */}
    </div>
  </div>
</section>

      </main>

      <footer className="text-center p-6 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white">
        <div className="container mx-auto space-y-4">
          <p>© 2024 Anonymous Feedback. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
