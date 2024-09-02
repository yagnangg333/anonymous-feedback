import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

export const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Interface for Organization
export interface Organization extends Document {
  name: string;
  type: string; 
  email: string;
  password: string;
  contactNumber: string;
  address: string;
  website?: string;
  description?: string;
  logo?: string;
  verifyCode: string;
  verifyCodeExpiry: Date; 
  isVerified: boolean;
  users: {
    userId: mongoose.Types.ObjectId; // Reference to the user
    role: string; // Role of the user within the organization
  }[];
  messages: any[]; // Embedded messages
  createdAt?: Date; // Timestamps
  updatedAt?: Date; // Timestamps
}

// Schema for Organization
const OrganizationSchema: Schema<Organization> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['School', 'Tech Company', 'Hospital', 'Non-Profit', 'Government', 'Corporate', 'Other'], // General types
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact Number is required'],
    match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid contact number'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please use a valid URL'],
  },
  description: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please use a valid URL for the logo'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  users: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: String,
      enum: ['Principal', 'Teacher', 'Student', 'Staff', 'CEO', 'Employee', 'Doctor', 'Nurse', 'Other'], // Roles in the organization
    },
  }],
  messages: [MessageSchema],
}, {
  timestamps: true,
});

const OrganizationModel =
  (mongoose.models.Organization as mongoose.Model<Organization>) ||
  mongoose.model<Organization>('Organization', OrganizationSchema);

export default OrganizationModel;
