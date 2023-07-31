import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IOrder = {
    create(arg0: IOrder[], arg1: { session: import("mongodb").ClientSession; }): unknown;
    cow: Types.ObjectId | IOrder;
    buyer: Types.ObjectId | IUser;
}
export type OrderModel = Model<IOrder, Record<string, unknown>>;
export type IOrderFilters = {
    searchTerm?: string;
};
