import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apolice } from "../entities/apolice.entity";
import { DeleteResult, Repository } from "typeorm";
import { CategoriaService } from "../../categorias/services/categorias.service";


@Injectable()
export class ApoliceService {
    constructor(
        @InjectRepository(Apolice)
        private apoliceRepository: Repository<Apolice>,
        private categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Apolice[]> {
        return await this.apoliceRepository.find({
            relations:{
                categoria: true
            }
        });
    }

    async findById(id: number): Promise<Apolice> {
        let apolice = await this.apoliceRepository.findOne({
            where: {
                id
            },
            relations:{
                categoria: true
            }
        });
        if (!apolice)
            throw new HttpException('Apólice não encontrada!', HttpStatus.NOT_FOUND);
        return apolice;
    }

    async findByApolice(apolice: number): Promise<Apolice[]> {
        return await this.apoliceRepository.find({
            where: {
                numero_apolice: apolice
            },
            relations: {
                categoria: true
            }
        })
    }

    async create(apolice: Apolice): Promise<Apolice> {

        // Se a apólice veio com categoria vinculada
        if (apolice.categoria) {

            // Busca a categoria no banco para garantir que existe
            const categoriaEncontrada = await this.categoriaService.findById(
                apolice.categoria.id
            );

            if (!categoriaEncontrada) {
                throw new HttpException(
                    'Categoria não encontrada!',HttpStatus.NOT_FOUND);
        }

            // garante que a categoria carregada é usada
            apolice.categoria = categoriaEncontrada;
    }

        // Salva a apólice já com categoria carregada
        return await this.apoliceRepository.save(apolice);
    }


    async update(id: number, apolice: Apolice): Promise<Apolice> {
        const apoliceEncontrado = await this.findById(id)

        return this.apoliceRepository.save({
            ...apoliceEncontrado,
            ...apolice,
        });
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
        return await this.apoliceRepository.delete(id)
    }

}