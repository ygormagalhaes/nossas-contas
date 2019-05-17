import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
