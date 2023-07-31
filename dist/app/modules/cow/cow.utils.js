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
exports.generateCowId = exports.cowFilterableFields = exports.findLastCowId = exports.cowSearchableFields = void 0;
const cow_model_1 = require("./cow.model");
exports.cowSearchableFields = ['name', 'price', 'breed', 'weight', 'location'];
const findLastCowId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastCow = yield cow_model_1.Cow.findOne({}, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean();
    return lastCow === null || lastCow === void 0 ? void 0 : lastCow.id;
});
exports.findLastCowId = findLastCowId;
exports.cowFilterableFields = [
    'searchTerm',
    'name',
    'price',
    'breed',
    'location',
    'weight',
];
const generateCowId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastCowId)()) || (0).toString().padStart(5, '0');
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    return incrementedId;
});
exports.generateCowId = generateCowId;
