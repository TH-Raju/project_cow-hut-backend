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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../../share/catchAsync"));
const user_utils_1 = require("./user.utils");
const pick_1 = __importDefault(require("../../../share/pick"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const sendResponse_1 = __importDefault(require("../../../share/sendResponse"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.UserService.createUser(user);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User Created Successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_utils_1.userFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationHelper_1.paginationFields);
    const result = yield user_service_1.UserService.getAllUser(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User's Find Successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User Find Successfully',
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User Deleted Successfully',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield user_service_1.UserService.updateUser(id, updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User updated Successfully',
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser
};
