import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
        length: 255,
    })
    email: string;

    @Column({
        name: 'Senha',
        type: 'varchar',
        length: 8,
    })
    senha: string; // TODO: Guardar senha criptografada.

}
