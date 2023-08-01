import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { UserRole } from "../modules/user/user.interface";


interface MyRequest extends Request {
    user: {
        role: UserRole;
        phoneNumber: string;
    }
}

const auth = (...requiredRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //get authorization token
            const token = req.headers.authorization
            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
            }

            let verifiedUser = null;

            //verify token
            verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret)


            req.user = verifiedUser;

            //role diye guard korar jnno
            if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
                throw new ApiError(httpStatus.FORBIDDEN, 'FORBIDDEN')
            }

            next()
        } catch (error) {
            next(error)
        }
    };

export default auth;