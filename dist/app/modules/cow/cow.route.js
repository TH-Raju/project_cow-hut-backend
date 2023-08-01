"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_interface_1 = require("../user/user.interface");
const router = express_1.default.Router();
router.patch('/:id', (0, auth_1.default)(user_interface_1.UserRole.Seller), cow_controller_1.CowController.updatedCow);
router.get('/:id', (0, auth_1.default)(user_interface_1.UserRole.Admin, user_interface_1.UserRole.Buyer, user_interface_1.UserRole.Seller), cow_controller_1.CowController.getSingleCow);
router.delete('/:id', (0, auth_1.default)(user_interface_1.UserRole.Admin, user_interface_1.UserRole.Buyer, user_interface_1.UserRole.Seller), (0, auth_1.default)(user_interface_1.UserRole.Seller), cow_controller_1.CowController.deleteCow);
router.get('/', (0, auth_1.default)(user_interface_1.UserRole.Admin, user_interface_1.UserRole.Buyer, user_interface_1.UserRole.Seller), cow_controller_1.CowController.getAllCows);
router.post('/', (0, auth_1.default)(user_interface_1.UserRole.Seller), cow_controller_1.CowController.createCow);
exports.CowRoutes = router;
