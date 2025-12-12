import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Apolice } from "../entities/apolice.entity";
import { DeleteResult, Repository } from "typeorm";
import { CategoriaService } from "../../categorias/services/categorias.service";
import { UsuarioService } from "../../usuario/service/usuario.service";
import { Usuario } from "../../usuario/entities/usuario.entity";


@Injectable()
export class ApoliceService {
    constructor(
        @InjectRepository(Apolice)
        private apoliceRepository: Repository<Apolice>,
        private categoriaService: CategoriaService,
        @Inject(forwardRef(() => UsuarioService))
        private usuarioService: UsuarioService
    ) { }

    async findAll(): Promise<Apolice[]> {
        return await this.apoliceRepository.find({
            relations: {
                categoria: true,
                usuario: true,
            }
        });
    }

    async findById(id: number): Promise<Apolice> {
        let apolice = await this.apoliceRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true,
                usuario: true,
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
                categoria: true,
                usuario: true,
            }
        })
    }

    async create(apolice: Apolice): Promise<Apolice> {

        if (apolice.categoria) {
            const categoriaEncontrada = await this.categoriaService.findById(
                apolice.categoria.id
            );

            if (!categoriaEncontrada) {
                throw new HttpException(
                    'Categoria não encontrada!', HttpStatus.NOT_FOUND);
            }
            apolice.categoria = categoriaEncontrada;
        }

        if (apolice.usuario) {
            const usuarioEncontrado = await this.usuarioService.findById(
                apolice.usuario.id
            );

            if (!usuarioEncontrado) {
                throw new HttpException(
                    'Usuário não encontrado!', HttpStatus.NOT_FOUND);
            }

            apolice.usuario = usuarioEncontrado;
        }

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