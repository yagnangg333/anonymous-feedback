import NextAuth from 'next-auth/next';
import { authOptions } from './options';
import { orgAuthOptions } from './org-options';

const handler = NextAuth(authOptions);
const orgHandler = NextAuth(orgAuthOptions);



