import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categorias.entity';

@Injectable()
export class CategoriaService implements OnModuleInit {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  /** Executa automaticamente ao iniciar o módulo */
  async onModuleInit() {
    await this.seedCategorias();
  }

  /** Popula categorias padrão sem duplicar */
  private async seedCategorias(): Promise<void> {
    const categoriasBase = [
      {
        nome: 'Vida Individual',
        descricao:
          'Seguro de vida para pessoa física, com coberturas personalizadas.',
      },
      {
        nome: 'Vida Familiar',
        descricao:
          'Seguro que protege o núcleo familiar com múltiplos beneficiários.',
      },
      {
        nome: 'Vida Empresarial',
        descricao:
          'Seguro contratado por empresas para proteção dos funcionários.',
      },
      {
        nome: 'Prestamista',
        descricao:
          'Seguro que quita dívidas em caso de morte, invalidez ou desemprego.',
      },
      {
        nome: 'Acidentes Pessoais',
        descricao: 'Seguro em caso de invalidez ou morte por acidente.',
      },
      {
        nome: 'Vida Resgatável',
        descricao:
          'Seguro que permite acumular capital e resgatar valores pagos.',
      },
      {
        nome: 'Doenças Graves',
        descricao:
          'Seguro com indenização em caso de diagnóstico de doenças graves.',
      },
      {
        nome: 'Vida Coletivo',
        descricao: 'Seguro contratado por grupos, empresas ou associações.',
      },
      {
        nome: 'Vida Educacional',
        descricao:
          'Seguro que garante a continuidade dos estudos dos dependentes.',
      },
      {
        nome: 'Vida Sênior',
        descricao: 'Seguro destinado a pessoas com 60 anos ou mais.',
      },
    ];

    for (const categoria of categoriasBase) {
      const existe = await this.categoriaRepository.findOne({
        where: { nome: categoria.nome },
      });

      if (!existe) {
        await this.categoriaRepository.save(categoria);
      }
    }
  }

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
