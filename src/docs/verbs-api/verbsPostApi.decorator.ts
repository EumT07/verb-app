import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

export function verbsPostApi() {
    return applyDecorators(
        ApiQuery({
            name: "page",
            schema:{type:"number"},
            description:"Write any number between [1-13] *",
            example:"V5-AGR-2065",
            required: false
        }),
        ApiQuery({
            name: "limit",
            schema:{type:"number"},
            description:"Enter the quantity of the items you want to obtain, between [1-30]",
            example:"30",
            required: false
        }),
        ApiResponse({ status: 201, description: 'Getting all verbs' }),
        ApiResponse({ status: 404, description: 'Error trying get Verbs' })
    );
}