import { Parcela } from './../conta/parcela.model';
import { Usuario as Usuario } from './../usuario/usuario.model';
import { TipoTransacao } from './tipo-transacao.enum';
import { Conta } from '../conta/conta.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity({
    name: 'Transacoes',
})
export class Transacao {

    @PrimaryGeneratedColumn({
        name: 'ID',
    })
    id: number;

    @Column({
        name: 'Valor',
        type: 'decimal',
        precision: 9,
        scale: 2,
    })
    valor: number;

    @Column({
        name: 'Tipo',
        type: 'enum',
        enum: TipoTransacao,
    })
    tipo: TipoTransacao;

    usuario: Usuario; // TODO: Implementar

    @Column({
        name: 'Data',
        type: 'date',
    })
    data: Date;

    @Column({
        name: 'Descricao',
        type: 'varchar',
        length: 255,
    })
    descricao: string;

    @OneToOne(type => Conta, conta => conta.transacao, {
        nullable: true,
    })
    @JoinColumn({
        name: 'ContaID',
    })
    conta?: Conta;

    @OneToOne(type => Parcela, {
        nullable: true,
    })
    @JoinColumn({
        name: 'ParcelaID',
    })
    parcela?: Parcela;

    @Column({
        name: 'Mensal',
        type: 'boolean',
        nullable: true,
    })
    mensal?: boolean;
}
