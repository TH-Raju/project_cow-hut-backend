import { Schema, model } from "mongoose";
import { OrderModel, IOrder } from "./order.interface";


export enum Label {
    ForSale = 'for sale',
    SoldOut = 'sold out',
}


export const OrderSchema = new Schema<IOrder, OrderModel>({

    cow: {
        type: Schema.Types.ObjectId,
        ref: 'Cow',
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

}, {
    //for createdAt and updatedAt
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});


export const Order = model<IOrder, OrderModel>('Order', OrderSchema);


