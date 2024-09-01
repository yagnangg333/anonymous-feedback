import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import OrganizationModel from '@/model/Organization';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { orgName, orgType, email, contactNumber, address, website, password } = await request.json();

    // Check if all required fields are present
    if (!orgName || !orgType || !email || !contactNumber || !address || !password) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required' }),
        { status: 400 }
      );
    }

    // Check if the organization already exists by email
    const existingOrg = await OrganizationModel.findOne({ email });

    if (existingOrg) {
      return new Response(
        JSON.stringify({ success: false, message: 'Organization already exists with this email' }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a new organization instance
    const newOrg = new OrganizationModel({
      name: orgName,
      type: orgType,
      email,
      contactNumber,
      address,
      website,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry: new Date(Date.now() + 3600000), // 1 hour from now
      isVerified: false,
      users: [],
      messages: [],
    });

    // Save the new organization to the database
    await newOrg.save();

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      orgName,
      verifyCode
    );

    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({ success: false, message: emailResponse.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Organization created successfully. Please verify your email.' }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating organization:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
