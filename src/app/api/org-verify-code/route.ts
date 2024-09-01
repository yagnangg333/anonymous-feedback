import dbConnect from '@/lib/dbConnect';
import OrganizationModel from '@/model/Organization';

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { orgname, code } = await request.json();
    const decodedOrgName = decodeURIComponent(orgname);
    const organization = await OrganizationModel.findOne({ name: decodedOrgName });

    if (!organization) {
      return new Response(
        JSON.stringify({ success: false, message: 'Organization not found' }),
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    const isCodeValid = organization.verifyCode === code;
    const isCodeNotExpired = new Date(organization.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update the organization's verification status
      organization.isVerified = true;
      await organization.save();

      return new Response(
        JSON.stringify({ success: true, message: 'Organization verified successfully' }),
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Verification code has expired. Please sign up again to get a new code.',
        }),
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return new Response(
        JSON.stringify({ success: false, message: 'Incorrect verification code' }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying organization:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error verifying organization' }),
      { status: 500 }
    );
  }
}
