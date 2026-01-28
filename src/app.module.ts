import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categorias/categoria.module';
import { Categoria } from './categorias/entities/categorias.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { ApoliceModule } from './apolice/apolice.module';
import { Apolice } from './apolice/entities/apolice.entity';
import { ProdService } from './data/services/prod.service';


@Module({
  imports: [
    // Deixa disponivel em todo o projeto as variaveis de hambiente.
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // configurar acesso ao banco de dados
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    ApoliceModule,
    UsuarioModule,
    CategoriaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
