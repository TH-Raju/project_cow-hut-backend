"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const router = express_1.default.Router();
router.patch('/:id', cow_controller_1.CowController.updatedCow);
router.get('/:id', cow_controller_1.CowController.getSingleCow);
router.delete('/:id', cow_controller_1.CowController.deleteCow);
router.get('/', cow_controller_1.CowController.getAllCows);
router.post('/', cow_controller_1.CowController.createCow);
exports.CowRoutes = router;
