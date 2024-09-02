import dbConnect from '@/lib/dbConnect';
import { Message } from '@/model/Organization';
import OrganizationModel from '@/model/Organization';

export async function POST(request: Request) {
  await dbConnect();
  const { orgname, content } = await request.json();

  // console.log(orgname , content);
  const name = orgname;
  // console.log(name)

  try {
    const user = await OrganizationModel.findOne({ name }).exec();

    // console.log(user);
    

    if (!user) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    const newMessage = { content, createdAt: new Date() };

    // Push the new message to the user's messages array
    user.messages.push(newMessage as Message);
    await user.save();

    return Response.json(
      { message: 'Message sent successfully', success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding message:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
