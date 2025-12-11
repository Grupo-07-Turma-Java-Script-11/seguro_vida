import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categorias.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  /** Consulta todas as categorias */
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: ['apolices'],
    });
  }

  /** Busca categoria pelo ID */
  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['apolices'],
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    return categoria;
  }

  /** Criar categoria */
  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  /** Atualizar categoria  */
  async update(id: number, categoria: Categoria): Promise<Categoria> {
    const categoriaExistente = await this.findById(id);

    const categoriaAtualizada = {
      ...categoriaExistente,
      ...categoria,
    };

    return await this.categoriaRepository.save(categoriaAtualizada);
  }

  /** Remover categoria */
  async delete(id: number): Promise<void> {
    const categoria = await this.findById(id);
    await this.categoriaRepository.remove(categoria);
  }
}

