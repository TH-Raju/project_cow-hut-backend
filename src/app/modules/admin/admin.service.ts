import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';


const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const createdOrder = await Admin.create(admin)
  return createdOrder
}

export const AdminService = {
  createAdmin,
};
