import { applyDecorators, HttpCode } from "@nestjs/common";
import { ApiParam, ApiResponse } from "@nestjs/swagger";

export function resetPassPostApi(){
    return applyDecorators(
        ApiParam({
            name: "id",
            schema: {
                type: "string",
            },
            description: "User Id",
            example: "6d4619cc-ea01-4fc6-b64d-bf1c6ed48ced"
        }),
        ApiResponse({
            status: 201,
            description: "Your Password has been changed!!"
        }),
        ApiResponse({
            status: 404,
            description: "Password are different"
        }),
        HttpCode(201)
    );
};