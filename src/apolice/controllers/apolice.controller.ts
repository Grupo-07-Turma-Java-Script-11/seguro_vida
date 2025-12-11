import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApoliceService } from "../services/apolice.service";
import { Apolice } from "../entities/apolice.entity";
import { get } from "http";

@Controller("/apolices")
export class ApoliceController {
    constructor(private readonly apoliceService: ApoliceService) { }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Apolice[]> {
        return this.apoliceService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise<Apolice>{
        return this.apoliceService.findById(id);
    }

  
    @Get('/apolice/:apolice') 
    @HttpCode(HttpStatus.OK)
    findByApolice(@Param('apolice') apolice: number): Promise<Apolice[]> {
        return this.apoliceService.findByApolice(apolice);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() apolice: Apolice): Promise <Apolice>{
        return this.apoliceService.create(apolice);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id:number, ParseIntPipe: ParseIntPipe, @Body() apolice: Apolice): Promise<Apolice>{
        return this.apoliceService.update(apolice);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.apoliceService.delete(id);
    }


}