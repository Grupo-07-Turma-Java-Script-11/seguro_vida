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

    ) { }

    // Criar
    async create(usuario: Usuario): Promise<Usuario> {
        // 1. Calcula a idade e guarda na constante
        const idadeCalculada = this.calcularIdade(usuario.data_nascimento);

        // 2. Valida a idade
        if (idadeCalculada < 18) {
            throw new HttpException(
                "Usuário menor de 18 anos não pode contratar seguro de vida",
                HttpStatus.BAD_REQUEST
            );
        }

        // CORREÇÃO: Atribui a idade calculada ao objeto usuario antes de salvar
        usuario.idade = idadeCalculada;

        if (usuario.apolice && usuario.apolice.length > 0) {
            for (const apoliceItem of usuario.apolice) {
                const apoliceEncontrada = await this.apoliceService.findById(apoliceItem.id);

                if (!apoliceEncontrada) {
                    throw new HttpException(
                        `Erro ao criar o usuário: Apólice com ID ${apoliceItem.id} não encontrada`,
                        HttpStatus.NOT_FOUND
                    );
                }
            }
        }

        return await this.usuarioRepository.save(usuario);
    }

    private calcularIdade(dataNascimento: Date): number {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();

        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade;
    }


    // Listar todos
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            relations: {
                apolice: true,
            }
        });
    }

    // Buscar por ID
    async findById(id: number): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },

            relations: {
                apolice: true,
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
