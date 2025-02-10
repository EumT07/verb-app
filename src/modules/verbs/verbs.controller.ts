import { Controller, Get, Param, Query } from '@nestjs/common';
import { VerbsService } from './verbs.service';
import { PaginationDto } from 'src/shared/common/pagination.dto';

@Controller('verbs')
export class VerbsController {
    constructor(
        private readonly verbService: VerbsService
    ){}

    @Get()
    getAllVerbs(@Query() paginationDto: PaginationDto){
        return this.verbService.allVerbs(paginationDto);
    }

    @Get("regular")
    getRegularVerbs(
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.regularVerbs(paginationDto);
    }
    @Get('irregular')
    getIrregularVerbs(
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.irregularVerbs(paginationDto);
    }

    @Get(":id")
    getVerbById(@Param('id') id: string){
        return this.verbService.verbById(id);
    }

    @Get('search/:verb')
    getVerbsByType(
        @Param("verb") word: string,
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.allVerbsBySearch(word, paginationDto);
    }

    @Get('search/regular/:verb')
    getRebularVerbsBySearch(
        @Param("verb") word: string,
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.regularVerbsBySearch(word, paginationDto)
    }
    @Get('search/irregular/:verb')
    getIrrebularVerbsBySearch(
        @Param("verb") word: string,
        @Query() paginationDto: PaginationDto
    ){
        return this.verbService.irregularVerbsBySearch(word, paginationDto)
    }
}
