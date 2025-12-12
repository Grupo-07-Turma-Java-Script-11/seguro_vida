import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioService } from "./service/usuario.service";
import { UsuarioController } from "./controller/usuario.controller";
import { ApoliceModule } from "../apolice/apolice.module";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => ApoliceModule)],
    providers: [UsuarioService],
    controllers: [UsuarioController],
    exports: [UsuarioService],
})
export class UsuarioModule { }
