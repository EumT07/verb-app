import { applyDecorators } from "@nestjs/common";
import { ApiParam, ApiResponse,  } from "@nestjs/swagger";

export function searchVerbsPostApi(){
    return applyDecorators(
        ApiParam({
            name: "verb",
            schema: {type: "string"},
            description: "Search any verb by any text character",
            example: "Do"
        }),
        ApiResponse({ status: 201, description: 'Getting all verbs that matches or includes some of the entered characters' }),
        ApiResponse({ status: 404, description: 'Error trying get Verbs' })
    );
}
export function searchRegularVerbsPostApi(){
    return applyDecorators(
        ApiParam({
            name: "verb",
            schema: {type: "string"},
            description: "Search any regular verb by any text character",
            example: "Do"
        }),
        ApiResponse({ status: 201, description: 'Getting all regular verbs that matches or includes some of the entered characters' }),
        ApiResponse({ status: 404, description: 'Error trying get Verbs' })
    );
}
export function searchIrregularVerbsPostApi(){
    return applyDecorators(
        ApiParam({
            name: "verb",
            schema: {type: "string"},
            description: "Search any irregular verb by any text character",
            example: "Do"
        }),
        ApiResponse({ status: 201, description: 'Getting all irregular verbs that matches or includes some of the entered characters' }),
        ApiResponse({ status: 404, description: 'Error trying get Verbs' })
    );
}