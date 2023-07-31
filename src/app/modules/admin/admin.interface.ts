import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type IAdmin = {
  password: string;
  role: string;
  name: UserName;
  phoneNumber: string;
  address: string;

};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  phoneNumber?: string;
  role?: string;
  pasword?: string;
  name?: string;
  address?: string;
};
