import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';

export function irregularVerbsPostApi() {
    return applyDecorators(
        ApiQuery({
            name: "page",
            schema:{type:"number"},
            description:"Write any number between [1-13] *",
            example:"1",
            required: false
        }),
        ApiQuery({
            name: "limit",
            schema:{type:"number"},
            description:"Enter the quantity of the items you want to obtain, between [1-30]",
            example:"30",
            required: false
        }),
        ApiResponse({ status: 201, description: 'Gettin all irregular Verbs' }),
        ApiResponse({ status: 404, description: 'Error trying get Verbs' })
    );
}