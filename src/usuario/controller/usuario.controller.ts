import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";

@Controller("/usuario")
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario);
    }

    @Get()
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Get("/:id")
    findById(@Param("id", ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.findById(id);
    }

    @Put("/:id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() usuario: Usuario
    ): Promise<Usuario> {
        return this.usuarioService.update(id, usuario);
    }

    @Delete("/:id")
    delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        return this.usuarioService.delete(id);
    }
}
