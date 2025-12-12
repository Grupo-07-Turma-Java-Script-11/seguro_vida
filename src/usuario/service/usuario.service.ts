import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { ApoliceService } from "../../apolice/services/apolice.service";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private apoliceService: ApoliceService

    ) {}

    // Criar
	async create(usuario: Usuario): Promise<Usuario> {
    if (usuario.idade < 18) {
        throw new HttpException(
            'Usuário menor de 18 anos não pode contratar seguro de vida.',
            HttpStatus.BAD_REQUEST
        );
    }

    if (usuario.apolice) {
        let apolice = await this.apoliceService.findById(usuario.apolice.id);

        if (!apolice) {
            throw new HttpException(
                'Erro ao criar o usuário: Apólice não encontrada',
                HttpStatus.NOT_FOUND
            );
        }

        return await this.usuarioRepository.save(usuario);
    }

    return await this.usuarioRepository.save(usuario);
}


    // Listar todos
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            relations: {
                apolice: true
            }
        });
    }

    // Buscar por ID
    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },

            relations:{
                apolice: true
            }
        });

        if (!usuario) {
            throw new NotFoundException("Usuário não encontrado");
        }

        return usuario;
    }

    // Atualizar
    async update(id: number, usuario: Usuario): Promise<Usuario> {
        const usuarioEncontrado = await this.findById(id);

        return this.usuarioRepository.save({
            ...usuarioEncontrado,
            ...usuario,
        });
    }

    // Deletar
    async delete(id: number): Promise<void> {
        const usuario = await this.findById(id);
        await this.usuarioRepository.remove(usuario);
    }
}
