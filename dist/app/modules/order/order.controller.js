"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../share/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../share/sendResponse"));
const order_service_1 = require("./order.service");
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const order = req.body;
        const result = yield order_service_1.OrderService.createOrder(order);
        let checkCow = yield cow_model_1.Cow.find({ _id: order.cow });
        let cowPrice = checkCow[0].price;
        let checkBuyer = yield user_model_1.User.find({ _id: order.buyer });
        let userBudget = checkBuyer[0].budget;
        if (userBudget === 0 && userBudget < cowPrice) {
            res.status(400).json({
                success: false,
                message: 'Increase Your Budget'
            });
        }
        else {
            yield cow_model_1.Cow.updateOne({ _id: order.cow }, { $set: { label: 'sold out' } }, { new: true });
            yield user_model_1.User.updateOne({ _id: order.buyer }, { $set: { budget: userBudget - cowPrice } }, { new: true });
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: 'Order Added Successfully',
                data: result
            });
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        next(error);
    }
});
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getAllOrders();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Order retrieved Successfully",
        data: result
    });
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield order_service_1.OrderService.getSingleOrder(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Order Find Successfully',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder
};
