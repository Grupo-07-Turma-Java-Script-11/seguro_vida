import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriaService } from '../services/categorias.service';
import { Categoria } from '../entities/categorias.entity';

@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // Listar todas as categorias
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  // Buscar categoria por ID
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number,parseIntPipe: ParseIntPipe): Promise<Categoria> {
    return this.categoriaService.findById(id,);
  }

  // Criar nova categoria
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  // Atualizar categoria por ID
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number, parseIntPipe: ParseIntPipe,
    @Body() categoria: Categoria,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, categoria);
  }

  // Deletar categoria por ID
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number,parseIntPipe: ParseIntPipe): Promise<void> {
    return this.categoriaService.delete(id);
  }
}
