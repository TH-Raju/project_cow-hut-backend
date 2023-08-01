import { Model, Types } from "mongoose";
import { ICow } from "../cow/cow.interface";

export enum UserRole {
    Seller = 'seller',
    Buyer = 'buyer',
    Admin = 'admin'
}
export type UserName = {
    firstName: string;
    lastName: string;
};

export type IUser = {
    id: string;
    phoneNumber: string;
    role: UserRole;
    password: string;
    name: UserName;
    firstName: string;
    lastName: string;
    address: string;
    budget: number;
    income: number;
    cow?: Types.ObjectId | ICow;
    needsPasswordChange: true | false;
}

export type UserModel = {
    isUserExist(phoneNumber: string): Promise<Pick<IUser, 'phoneNumber' | 'role' | 'password' | 'needsPasswordChange'>>

    isPasswordMatched(givenPassword: string, savePassword: string): Promise<boolean>;
} & Model<IUser>;


// export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
    searchTerm?: string;
    phoneNumber?: string;
    role?: string;

};




