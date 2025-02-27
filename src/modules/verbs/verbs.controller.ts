import { Controller, Get, Param, Query } from '@nestjs/common';
import { VerbsService } from './verbs.service';
import { PaginationDto } from 'src/shared/common/index';
import { ApiTags } from "@nestjs/swagger"
import { verbsPostApi, regularVerbsPostApi, irregularVerbsPostApi, verbByIdPostApi, searchVerbsPostApi, searchRegularVerbsPostApi, searchIrregularVerbsPostApi } from 'src/docs/verbs-api/index';

@ApiTags("Verbs")
@Controller('verbs')
export class VerbsController {
    constructor(
        private readonly verbService: VerbsService
    ){}

    @verbsPostApi()
    @Get()
    getAllVerbs(@Query() paginationDto: PaginationDto){
        return this.verbService.allVerbs(paginationDto);
    }

    @regularVerbsPostApi()
    @Get("regular")
    getRegularVerbs(
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.regularVerbs(paginationDto);
    }

    @irregularVerbsPostApi()
    @Get('irregular')
    getIrregularVerbs(
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.irregularVerbs(paginationDto);
    }

    @verbByIdPostApi()
    @Get(":id")
    getVerbById(@Param('id') id: string){
        return this.verbService.verbById(id);
    }

    @searchVerbsPostApi()
    @Get('search/:verb')
    getVerbsByType(
        @Param("verb") word: string,
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.allVerbsBySearch(word, paginationDto);
    }

    @searchRegularVerbsPostApi()
    @Get('search/regular/:verb')
    getRebularVerbsBySearch(
        @Param("verb") word: string,
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.regularVerbsBySearch(word, paginationDto)
    }

    @searchIrregularVerbsPostApi()
    @Get('search/irregular/:verb')
    getIrrebularVerbsBySearch(
        @Param("verb") word: string,
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.irregularVerbsBySearch(word, paginationDto)
    }
}
