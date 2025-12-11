import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Apolice } from '../../apolices/entities/apolice.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, unique: true })
  nome: string;

  @Column({ length: 255, nullable: false })
  descricao: string;

  @OneToMany(() => Apolice, (apolice) => apolice.categoria)
  apolices: Apolice[];
}
