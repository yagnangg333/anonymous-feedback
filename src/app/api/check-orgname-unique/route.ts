import dbConnect from '@/lib/dbConnect';
import OrganizationModel from '@/model/Organization';
import { z } from 'zod';

// Schema for validating the organization name in the query parameters
const OrgNameQuerySchema = z.object({
  orgName: z.string().min(1, { message: "Organization name cannot be empty" }),
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      orgName: searchParams.get('orgName'),
    };

    const result = OrgNameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      const orgNameErrors = result.error.format().orgName?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            orgNameErrors?.length > 0
              ? orgNameErrors.join(', ')
              : 'Invalid query parameters',
        },
        { status: 400 }
      );
    }

    const { orgName } = result.data;

    // Check if an organization with the given name and verified status already exists
    const existingVerifiedOrg = await OrganizationModel.findOne({
      name: orgName,
      isVerified: true,
    });

    if (existingVerifiedOrg) {
      return Response.json(
        {
          success: false,
          message: 'Organization name is already taken',
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Organization name is unique',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking organization name:', error);
    return Response.json(
      {
        success: false,
        message: 'Error checking organization name',
      },
      { status: 500 }
    );
  }
}
