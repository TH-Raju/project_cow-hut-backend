import { Schema, model } from 'mongoose';
import { IAdmin, AdminModel } from './admin.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);


AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, 'phoneNumber' | 'role' | 'password' | 'needsPasswordChange'> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, role: 1, password: 1, needsPasswordChange: 1 }
  );
}

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string, savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword)

}


AdminSchema.pre('save', async function (next) {

  //hashing password
  const admin = this
  admin.password = await bcrypt.hash(admin.password, Number(config.bcrypt_salt_round))

  next()
})



export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);


