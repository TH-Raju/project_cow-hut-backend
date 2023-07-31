"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErroHandler_1 = __importDefault(require("./app/middlewares/globalErroHandler"));
const user_route_1 = require("./app/modules/user/user.route");
const cow_route_1 = require("./app/modules/cow/cow.route");
const user_auth_route_1 = require("./app/modules/user/user.auth.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Application Routes
app.use('/api/v1/users/', user_route_1.UserRoutes);
app.use('/api/v1/auth/', user_auth_route_1.AuthUserRoutes);
app.use('/api/v1/cows/', cow_route_1.CowRoutes);
app.use('/api/v1/orders/', order_route_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('Server Working....');
});
app.use(globalErroHandler_1.default);
exports.default = app;
