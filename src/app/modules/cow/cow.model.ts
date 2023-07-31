import { Schema, Types, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";
import { breed, category, label, location } from "./cow.constant";


export enum Label {
    ForSale = 'for sale',
    SoldOut = 'sold out',
}

export enum Category {
    Dairy = 'Dairy',
    Beef = 'Beef',
    DualPurpose = 'Dual Purpose',
}


export const CowSchema = new Schema<ICow, CowModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        enum: location,
        required: true
    },
    breed: {
        type: String,
        enum: breed,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        enum: label,
        default: Label.ForSale
    },
    category: {
        type: String,
        enum: category,
        required: true
    },
    seller: {
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


export const Cow = model<ICow, CowModel>('Cow', CowSchema);


