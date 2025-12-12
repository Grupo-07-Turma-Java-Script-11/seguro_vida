import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categorias/entities/categorias.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: 'tb_apolice' })
export class Apolice {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column("bigint", { nullable: false })
    numero_apolice: number;

    @IsNotEmpty()
    @Column("decimal", { precision: 15, scale: 2, nullable: false })
    valor_segurado: number;

    @UpdateDateColumn()
    data_inicio: Date;

    @IsOptional() // Data opcional, pois algumas apólices podem não ter data fim
    @Column({ type: "date", nullable: true })
    data_fim: Date;

    @ManyToOne(() => Categoria, (categoria) => categoria.apolice, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

    @ManyToOne(() => Usuario, (usuario) => usuario.apolice, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}