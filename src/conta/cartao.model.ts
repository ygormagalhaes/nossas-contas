import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './../usuario/usuario.model';

@Entity({
    name: 'Cartoes',
})
export class Cartao {

    @PrimaryGeneratedColumn({
        name: 'ID',
    })
    id: number;

    @Column({
        name: 'Descricao',
        type: 'varchar',
        length: 255,
    })
    descricao: string;

    @ManyToOne(type => Usuario)
    @JoinColumn({
        name: 'UsuarioID',
    })
    usuario: Usuario;
}
