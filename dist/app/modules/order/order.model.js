"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderSchema = exports.Label = void 0;
const mongoose_1 = require("mongoose");
var Label;
(function (Label) {
    Label["ForSale"] = "for sale";
    Label["SoldOut"] = "sold out";
})(Label = exports.Label || (exports.Label = {}));
exports.OrderSchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cow',
    },
    buyer: {
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
exports.Order = (0, mongoose_1.model)('Order', exports.OrderSchema);
