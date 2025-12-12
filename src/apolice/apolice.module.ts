import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apolice } from "./entities/apolice.entity";
import { ApoliceService } from "./services/apolice.service";
import { ApoliceController } from "./controllers/apolice.controller";
import { CategoriaModule } from "../categorias/categoria.module";

@Module({
    imports: [TypeOrmModule.forFeature([Apolice]), CategoriaModule],
    providers: [ApoliceService],
    controllers: [ApoliceController],
    exports: [ApoliceService],
})
export class ApoliceModule{}