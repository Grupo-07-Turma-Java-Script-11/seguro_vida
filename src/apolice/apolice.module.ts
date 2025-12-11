import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Apolice } from "./entities/apolice.entity";
import { ApoliceService } from "./services/apolice.service";
import { ApoliceController } from "./controllers/apolice.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Apolice])],
    providers: [ApoliceService],
    controllers: [ApoliceController],
    exports: [],
})
export class ApoliceModule{}