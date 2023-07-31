"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(user_interface_1.UserRole),
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cow'
    }
}, {
    //for createdAt and updatedAt
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
