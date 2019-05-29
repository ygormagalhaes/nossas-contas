import { Cartao } from './../conta/cartao.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({
    name: 'Usuarios',
})
export class Usuario {

    @PrimaryGeneratedColumn({
        name: 'ID',
    })
    id: number;

    @Column({
        name: 'Email',
        type: 'varchar',
        unique: true,
        length: 255,
    })
    email: string;

    @Column({
        name: 'Senha',
        type: 'varchar',
        length: 8,
    })
    senha: string; // TODO: Guardar senha criptografada.

    @OneToMany(type => Cartao, cartao => cartao.usuario)
    cartoes?: Cartao[];
}
