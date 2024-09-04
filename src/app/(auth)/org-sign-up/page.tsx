'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { orgSignUpSchema } from '@/schemas/orgSignUpSchema';
import organizationTypes from '@/helpers/organizationTypes'

export default function SignUpForm() {
    const [orgName, setOrgName] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debouncedOrgName = useDebounce(orgName, 300);

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof orgSignUpSchema>>({
        resolver: zodResolver(orgSignUpSchema),
        defaultValues: {
            orgName: '',
            orgType: undefined,
            email: '',
            contactNumber: '',
            address: '',
            password: '',
            website: '',
        },
    });

    useEffect(() => {
        const checkOrgNameUnique = async () => {
            if (debouncedOrgName) {
                setIsCheckingUsername(true);
                setUsernameMessage(''); // Reset message
                try {
                    const response = await axios.get<ApiResponse>(
                        `/api/check-orgname-unique?orgName=${debouncedOrgName}`
                    );
                    setUsernameMessage(response.data.message);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(
                        axiosError.response?.data.message ?? 'Error checking organization name'
                    );
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };
        checkOrgNameUnique();
    }, [debouncedOrgName]);

    const onSubmit = async (data: z.infer<typeof orgSignUpSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>('/api/org-sign-up', data);

            toast({
                title: 'Success',
                description: response.data.message,
            });

            router.replace(`/org-verify/${orgName}`);

            setIsSubmitting(false);
        } catch (error) {
            console.error('Error during sign-up:', error);

            const axiosError = error as AxiosError<ApiResponse>;

            let errorMessage = axiosError.response?.data.message ?? 
                'There was a problem with your sign-up. Please try again.';

            toast({
                title: 'Sign Up Failed',
                description: errorMessage,
                variant: 'destructive',
            });

            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500">
                        Join Anonymous Feedback
                    </h1>
                    <p className="mb-4 text-gray-300">Sign up to start your anonymous adventure</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="orgName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Organization Name</FormLabel>
                                    <Input {...field} className="bg-gray-800 text-white" />
                                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                                    {!isCheckingUsername && usernameMessage && (
                                        <p
                                            className={`text-sm ${usernameMessage === 'Organization name is unique'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                                }`}
                                        >
                                            {usernameMessage}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            name="orgType"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Select Type of Your Organization</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full bg-gray-800 text-white">
                                            <SelectValue placeholder="Select an Organization" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900">
                                            <SelectGroup>
                                                <SelectLabel className="text-gray-300">Organization</SelectLabel>
                                                {organizationTypes.map((type) => (
                                                    <SelectItem key={type} value={type} className="text-gray-300">
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Organization's Email</FormLabel>
                                    <Input {...field} className="bg-gray-800 text-white" />
                                    <p className='text-gray-400 text-sm'>We will send you a verification code</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            name="contactNumber"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Contact Number</FormLabel>
                                    <Input {...field} className="bg-gray-800 text-white" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            name="address"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Address</FormLabel>
                                    <Input {...field} className="bg-gray-800 text-white" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            name="website"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Website (Optional)</FormLabel>
                                    <Input {...field} className="bg-gray-800 text-white" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
    
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Password</FormLabel>
                                    <Input type="password" {...field} className="bg-gray-800 text-white" />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full p-6 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 text-white rounded-full hover:from-teal-500 hover:via-indigo-600 hover:to-purple-600 transition-all' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p className="text-gray-300">
                        Already a member?{' '}
                        <Link href="/org-sign-in" className="text-blue-400 hover:text-blue-600">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}    
