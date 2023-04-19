import { ErrorResponse } from './../models/error-response';
import { MessageResponse } from './../models/message-response';
import { JwtService } from './../services/jwt.service';
import { StatusCodes } from './../enums/status-codes';
import { NextFunction, Request, Response } from "express";

export const authenticationAndAuthorizationMiddleware = (role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const jwtService = new JwtService();
            const token = req.header("Authorization")?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(StatusCodes.UnAuthorised).send(new MessageResponse("unAuthorized"));
            }
    
            const decodedToken = jwtService.verify(token);
        
            const userRoles = decodedToken.roles;

            if (!userRoles || userRoles.length == 0) {
                return res.status(StatusCodes.Forbidden).send(new MessageResponse("Access Denied"));
            } else {

                let userHasAccess = false;

                const userRolesSet = new Set(userRoles);

                for(const expectedRoles of role) {
                    if (userRolesSet.has(expectedRoles)) {
                        userHasAccess = true;
                        break;
                    }
                }

                if (userHasAccess) {
                    res.locals.user = {
                        userName: decodedToken.username,
                        userEmail: decodedToken.userEmail,
                        userId: decodedToken.userId,
                        userGroup: decodedToken.userGroup
                    };
                    next();
                } else {
                    return res.status(StatusCodes.Forbidden).send(new MessageResponse("Access Denied"));
                }
            }
        }
        catch(err: any) {
            return res.status(StatusCodes.InternalServerError).send(new ErrorResponse(err.message, StatusCodes.InternalServerError, err));
        }
    }
    
}