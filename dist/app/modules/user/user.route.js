"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_interface_1 = require("./user.interface");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/my-profile', user_controller_1.UserController.getMyProfile);
router.patch('/my-profile', user_controller_1.UserController.updateProfile);
router.patch('/:id', (0, auth_1.default)(user_interface_1.UserRole.Admin), user_controller_1.UserController.updateUser);
router.get('/:id', (0, auth_1.default)(user_interface_1.UserRole.Admin), user_controller_1.UserController.getSingleUser);
router.delete('/:id', (0, auth_1.default)(user_interface_1.UserRole.Admin), user_controller_1.UserController.deleteUser);
router.get('/', (0, auth_1.default)(user_interface_1.UserRole.Admin), user_controller_1.UserController.getAllUser);
exports.UserRoutes = router;
