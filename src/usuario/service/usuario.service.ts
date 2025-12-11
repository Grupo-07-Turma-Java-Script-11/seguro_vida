import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>
    ) {}

    // Criar
    async create(usuario: Usuario): Promise<Usuario> {
        return this.usuarioRepository.save(usuario);
    }

    // Listar todos
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    // Buscar por ID
    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id }
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
