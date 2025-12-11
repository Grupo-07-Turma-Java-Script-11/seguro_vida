import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';


@Module({
  imports: [
    // Deixa disponivel em todo o projeto as variaveis de hambiente.
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // configurar acesso ao banco de dados
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Usuario],
      synchronize: true,
    }),
    Usuario
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
