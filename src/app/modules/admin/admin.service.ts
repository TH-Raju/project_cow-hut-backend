import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';
import bcrypt from 'bcrypt';


const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  if (!admin.password) {
    admin.password = config.default_pass as string
  }

  const createdAdmin = await Admin.create(admin)
  if (!createdAdmin) {
    throw new ApiError(400, 'Failed to create Admin...')
  }
  return createdAdmin
}

export const AdminService = {
  createAdmin,
};
