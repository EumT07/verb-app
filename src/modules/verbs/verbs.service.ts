import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/shared/common/pagination.dto';


@Injectable()
export class VerbsService {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async allVerbs(paginationDto: PaginationDto){
        try {
            const {page, limit} = paginationDto;
            const totalPages = await this.prismaService.verbs.count();
            const lastPage = Math.ceil( totalPages / limit)
            const verbs = await this.prismaService.verbs.findMany({
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    infinitive: true,
                    type: true,
                    meaning: true,
                    IPA_regular_verbs:{
                        select: {
                            ipa_present_uk: true,
                            ipa_present_us: true
                        }
                    },
                    IPA_irregular_verbs:{
                        select: {
                            ipa_present_uk: true,
                            ipa_present_us: true
                        }
                    }
                },
                orderBy: {
                    infinitive: "asc"
                }
            })

            return {
                status: 201,
                metaData: {
                    totalRegisters: totalPages,
                    page: page,
                    lastPage: lastPage
                },
                length: verbs.length,
                verbs
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async verbById(id: string){
        try {
            const verb = await this.prismaService.verbs.findUnique({
                where: { id },
                select: {
                    infinitive: true,
                    present: true,
                    past: true,
                    past_participle: true,
                    present_participle: true,
                    meaning: true,
                    type: true,
                    IPA_regular_verbs:{
                        select: {
                            ipa_present_uk: true,
                            ipa_present_us: true,
                            ipa_past_uk: true,
                            ipa_past_us: true,
                            ipa_past_participle_uk: true,
                            ipa_past_participle_us: true,
                            ipa_present_participle_uk: true,
                            ipa_present_participle_us: true,
                        }
                    },
                    IPA_irregular_verbs:{
                        select: {
                            ipa_present_uk: true,
                            ipa_present_us: true,
                            ipa_past_uk: true,
                            ipa_past_us: true,
                            ipa_past_participle_uk: true,
                            ipa_past_participle_us: true,
                            ipa_present_participle_uk: true,
                            ipa_present_participle_us: true,
                        }
                    } 
                }
            })

            if(!verb) {
                throw new NotFoundException("Verb not Found")
            }

            return {
                status: 201,
                message: `Verb: ${verb.infinitive}`,
                verb
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    // async typeVerbs(typeVerb: string, paginationDto: PaginationDto){
    //     try {
            
    //         if(typeVerb.toLowerCase() === "regular"){

    //             const regularVerbs = await this.prismaService.regularVerbs.findMany({
    //                 select:{
    //                     id: true,
    //                     verbs:{
    //                         select: {
    //                             id: true,
    //                             infinitive: true,
    //                             present:true,
    //                             type: true,
    //                             meaning: true,
    //                             IPA_regular_verbs:{
    //                                 select: {
    //                                     ipa_present_uk: true,
    //                                     ipa_present_us: true
    //                                 }
    //                             } 
    //                         }
    //                     },
    //                 },orderBy: {
    //                     id: "asc"
    //                 }
    //             });

    //             return {
    //                 status: 201,
    //                 message: `Verbs: ${regularVerbs.length} Type: ${typeVerb.toUpperCase()}`,
    //                 length: regularVerbs.length,
    //                 regularVerbs
    //             }
    //         }


    //         if(typeVerb.toLowerCase() === "irregular"){

    //             const irregularVerbs = await this.prismaService.irregularVerbs.findMany({
    //                 select:{
    //                     id: true,
    //                     verbs:{
    //                         select: {
    //                             id: true,
    //                             infinitive: true,
    //                             present:true,
    //                             type: true,
    //                             meaning: true,
    //                             IPA_irregular_verbs:{
    //                                 select: {
    //                                     ipa_present_uk: true,
    //                                     ipa_present_us: true
    //                                 }
    //                             } 
    //                         }
    //                     },
    //                 },orderBy: {
    //                     id: "asc"
    //                 }
    //             });

    //             return {
    //                 status: 201,
    //                 message: `Verbs: ${irregularVerbs.length} Type: ${typeVerb.toUpperCase()}`,
    //                 length: irregularVerbs.length,
    //                 irregularVerbs
    //             }
    //         }

    //         if( (typeVerb.toLowerCase() !== "regular") && (typeVerb.toLowerCase() !== "irregular") ){
    //             throw new NotFoundException("Verbs Not found");
    //         }

            
    //     } catch (error) {
    //         throw new InternalServerErrorException(error.message)
    //     }
    // }

    async regularVerbs(paginationDto: PaginationDto){
        try {
            const {page, limit} = paginationDto;
            const totalPages = await this.prismaService.regularVerbs.count();
            const lastPage = Math.ceil( totalPages / limit)

            const regularVerbs = await this.prismaService.regularVerbs.findMany({
                skip: (page - 1) * limit,
                take: limit,
                select:{
                    id: true,
                    verbs:{
                        select: {
                            id: true,
                            infinitive: true,
                            type: true,
                            meaning: true,
                            IPA_regular_verbs:{
                                select: {
                                    ipa_present_uk: true,
                                    ipa_present_us: true
                                }
                            } 
                        }
                    },
                },orderBy: {
                    id: "asc"
                }
            });

            if(!regularVerbs){
                throw new NotFoundException("Verbs Not found")
            }

            return {
                status: 201,
                metaData: {
                    totalRegisters: totalPages,
                    page: page,
                    lastPage: lastPage
                },
                length: regularVerbs.length,
                regularVerbs
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    async irregularVerbs(paginationDto: PaginationDto){
        try {
            const {page, limit} = paginationDto;
            const totalPages = await this.prismaService.irregularVerbs.count();
            const lastPage = Math.ceil( totalPages / limit)
            
            const irregularVerbs = await this.prismaService.irregularVerbs.findMany({
                skip: (page - 1) * limit,
                take: limit,
                select:{
                    id: true,
                    verbs:{
                        select: {
                            id: true,
                            infinitive: true,
                            present:true,
                            type: true,
                            meaning: true,
                            IPA_irregular_verbs:{
                                select: {
                                    ipa_present_uk: true,
                                    ipa_present_us: true
                                }
                            } 
                        }
                    },
                },orderBy: {
                    id: "asc"
                }
            });

            if(!irregularVerbs){
                throw new NotFoundException("Verbs Not found")
            }

            return {
                status: 201,
                metaData: {
                    totalRegisters: totalPages,
                    page: page,
                    lastPage: lastPage
                },
                length: irregularVerbs.length,
                irregularVerbs
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
