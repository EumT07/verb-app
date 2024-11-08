import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function recoveryPassPostApi() {
    return applyDecorators(
        ApiResponse({ status: 201, description: 'We have sent you an email to recovery your password.!!' }),
        ApiResponse({ status: 404, description: 'Invalidad Email' }),
        HttpCode(201),
    );
};