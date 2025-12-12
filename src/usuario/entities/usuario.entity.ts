import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apolice } from "../../apolice/entities/apolice.entity";

@Entity({ name: "tb_usuarios" })
export class Usuario { 
    
    @IsNotEmpty()
    @PrimaryGeneratedColumn()
    id: number; 

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string; 
    
    @IsNotEmpty()
    @Column({ length: 255, nullable: false, unique: true })
    email: string;  

    @Column({ length: 5000, nullable: true })
    foto: string; 

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;
    
    @IsNotEmpty()
    @Column({ type: "date", nullable: false })
    data_nascimento: Date;

    @Column({ nullable: false })
    idade: number;

    @OneToMany(() => Apolice, (apolice) => apolice.usuario, {
        onDelete: "CASCADE"
    })
    apolice: Apolice
    apolices: any;
}
