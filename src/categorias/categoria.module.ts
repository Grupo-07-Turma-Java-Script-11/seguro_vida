import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categorias.entity';
import { CategoriaService } from './services/categorias.service';
import { CategoriaController } from './controllers/categorias.controller';
import { ApoliceModule } from '../apolice/apolice.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), forwardRef(() => ApoliceModule)],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService],
})
export class CategoriaModule { }
