import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_apolice'})
export class Apolice {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column("bigint", {nullable: false})
    numero_apolice: number;

    @IsNotEmpty()   
    @Column("decimal", {precision: 15, scale: 2, nullable: false })
    valor_segurado: number;

    @UpdateDateColumn()
    data_inicio: Date;

    @IsOptional() // Data opcional, pois algumas apólices podem não ter data fim
    @Column({type: "date", nullable: true})
    data_fim: Date;

}