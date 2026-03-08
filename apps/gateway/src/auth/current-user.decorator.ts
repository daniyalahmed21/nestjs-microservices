import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserContext } from "./auth.types";

export const CurrentUser = createParamDecorator(
    (data: unknown, req: ExecutionContext) => {
        const request = req.switchToHttp().getRequest();
        return request.user as UserContext;

    }
);