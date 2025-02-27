import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiParam } from '@nestjs/swagger';

export function verbByIdPostApi() {
    return applyDecorators(
        ApiParam({
            name: "id",
            schema:{type:"string"},
            description:"Enter any id like : V5-AGR-2065 ",
            example:"V5-AGR-2065"}),
        ApiResponse({ status: 201, description: 'Getting verb by id: V5-AGR-2065' }),
        ApiResponse({ status: 404, description: 'Error trying get Verb by id: V5-AGR-2065' })
    );
}