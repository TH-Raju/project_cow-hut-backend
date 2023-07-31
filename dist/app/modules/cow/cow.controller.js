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
exports.CowController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../share/catchAsync"));
const pick_1 = __importDefault(require("../../../share/pick"));
const sendResponse_1 = __importDefault(require("../../../share/sendResponse"));
const cow_utils_1 = require("./cow.utils");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const cow_service_1 = require("./cow.service");
const createCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cow = req.body;
        const result = yield cow_service_1.CowService.createCow(cow);
        res.status(200).json({
            success: true,
            message: 'Cow Added Successfully',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllCows = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cow_utils_1.cowFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationHelper_1.paginationFields);
    const result = yield cow_service_1.CowService.getAllCows(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cow's find Successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.CowService.getSingleCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' Cow retrieved Successfully',
        data: result,
    });
}));
const updatedCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield cow_service_1.CowService.updatedCow(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' Cow retrieved Successfully',
        data: result,
    });
}));
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.CowService.deleteCow(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' Cow Deleted Successfully',
        data: result,
    });
}));
exports.CowController = {
    createCow,
    getAllCows,
    getSingleCow,
    updatedCow,
    deleteCow,
};
