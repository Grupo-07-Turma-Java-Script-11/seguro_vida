import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categorias.entity';
import { ApoliceService } from '../../apolice/services/apolice.service';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @Inject(forwardRef(() => ApoliceService))
    private readonly apoliceService: ApoliceService,
  ) { }

  /** Consulta todas as categorias */
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        apolice: true
      }
    });
  }

  /** Busca categoria pelo ID */
  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: {
        apolice: true
      }
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    return categoria;
  }

  /** Criar categoria */
  async create(categoria: Categoria): Promise<Categoria> {
    if (categoria.apolice && categoria.apolice.length > 0) {

      for (const apoliceItem of categoria.apolice) {
        const apoliceEncontrado = await this.apoliceService.findById(apoliceItem.id);

        if (!apoliceEncontrado) {
          throw new HttpException('Apolice não encontrado', HttpStatus.NOT_FOUND);
        }
      }
    }

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

