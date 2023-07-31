"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = exports.CowSchema = exports.Category = exports.Label = void 0;
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
var Label;
(function (Label) {
    Label["ForSale"] = "for sale";
    Label["SoldOut"] = "sold out";
})(Label = exports.Label || (exports.Label = {}));
var Category;
(function (Category) {
    Category["Dairy"] = "Dairy";
    Category["Beef"] = "Beef";
    Category["DualPurpose"] = "Dual Purpose";
})(Category = exports.Category || (exports.Category = {}));
exports.CowSchema = new mongoose_1.Schema({
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
        enum: cow_constant_1.location,
        required: true
    },
    breed: {
        type: String,
        enum: cow_constant_1.breed,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        enum: cow_constant_1.label,
        default: Label.ForSale
    },
    category: {
        type: String,
        enum: cow_constant_1.category,
        required: true
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    //for createdAt and updatedAt
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
exports.Cow = (0, mongoose_1.model)('Cow', exports.CowSchema);
