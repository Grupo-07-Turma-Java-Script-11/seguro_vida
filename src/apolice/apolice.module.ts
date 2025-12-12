import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apolice } from "./entities/apolice.entity";
import { ApoliceService } from "./services/apolice.service";
import { ApoliceController } from "./controllers/apolice.controller";
import { CategoriaModule } from "../categorias/categoria.module";
import { UsuarioModule } from "../usuario/usuario.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Apolice]),
        forwardRef(() => CategoriaModule),
        forwardRef(() => UsuarioModule)
    ],
    providers: [ApoliceService],
    controllers: [ApoliceController],
    exports: [ApoliceService],
})
export class ApoliceModule { }