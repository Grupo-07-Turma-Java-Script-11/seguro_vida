import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apolice } from "../entities/apolice.entity";
import { DeleteResult, Repository } from "typeorm";


@Injectable()
export class ApoliceService{
    constructor(
        @InjectRepository(Apolice)
        private apoliceRepository: Repository<Apolice>
    ){}

    async findAll(): Promise<Apolice[]>{
        return await this.apoliceRepository.find();
    }

    async findById(id: number): Promise<Apolice>{ 
        let apolice = await this.apoliceRepository.findOne({
            where: {
                id
            }
        });
        if(!apolice)
            throw new HttpException('Apólice não encontrada!', HttpStatus.NOT_FOUND);
        return apolice;
    }

    async findByApolice(apolice: number): Promise<Apolice[]> { 
        return await this.apoliceRepository.find({
            where: { 
                numero_apolice: apolice 
        }
    })

    }

    async create(apolice: Apolice): Promise<Apolice>{
        return await this.apoliceRepository.save(apolice);
        
    }

    async update(apolice: Apolice): Promise<Apolice>{
        await this.findById(apolice.id)
        return await this.apoliceRepository.save(apolice);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
        return await this.apoliceRepository.delete(id)
    }

}