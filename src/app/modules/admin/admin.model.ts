import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
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
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre('save', async function (next) {

  //hashing password
  const admin = this
  admin.password = await bcrypt.hash(admin.password, Number(config.bcrypt_salt_round))

  next()
})

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
