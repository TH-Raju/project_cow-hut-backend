import { Model, Types } from "mongoose";
import { ICow } from "../cow/cow.interface";

export enum UserRole {
    Seller = 'seller',
    Buyer = 'buyer',
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
}

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
    searchTerm?: string;
};




