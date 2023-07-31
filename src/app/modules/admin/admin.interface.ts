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
  needsPasswordChange: true | false;

};

// export type IAdminMethods = {
//   isUserExist(phoneNumber: string): Promise<Partial<IAdmin> | null>;
//   isPasswordMatched(givenPassword: string, savePassword: string): Promise<boolean>;
// }

export type UserModel = {
  isUserExist(phoneNumber: string): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'needsPasswordChange'>>

  isPasswordMatched(givenPassword: string, savePassword: string): Promise<boolean>;
} & Model<IAdmin>;


// export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;

export type IAdminFilters = {
  searchTerm?: string;
  phoneNumber?: string;
  role?: string;
  pasword?: string;
  name?: string;
  address?: string;
};
