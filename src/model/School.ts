import mongoose, { Schema, Document } from 'mongoose';
import OrganizationModel from './Organization'; // Import the base Organization model

// Interface for School
export interface School extends Document {
  principal?: string;
  departments?: string[];
}

// Schema for School extending the base Organization schema
const SchoolSchema: Schema<School> = new mongoose.Schema({
  principal: {
    type: String,
    trim: true,
  },
  departments: [{
    type: String,
    trim: true,
  }],
});

// Extend the base Organization schema with School-specific fields
const SchoolModel = OrganizationModel.discriminator('School', SchoolSchema);

export default SchoolModel;
