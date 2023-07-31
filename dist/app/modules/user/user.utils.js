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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFilterableFields = exports.userSearchableFields = exports.generateUserId = exports.findLastUserId = void 0;
const user_model_1 = require("./user.model");
const findLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield user_model_1.User.findOne({}, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id;
});
exports.findLastUserId = findLastUserId;
const generateUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastUserId)()) || (0).toString().padStart(5, '0');
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    return incrementedId;
});
exports.generateUserId = generateUserId;
exports.userSearchableFields = ['name.firstName', 'budget', 'name.lastName'];
exports.userFilterableFields = [
    'searchTerm',
    'name.firstName',
    'name.lastName',
    'budget',
];
