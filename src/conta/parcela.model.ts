import { Conta } from './conta.model';
import { StatusParcela } from './status-parcela.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Transacao } from '../transacao/transacao.model';

@Entity({
    name: 'Parcelas',
})
export class Parcela {

    @PrimaryGeneratedColumn({
        name: 'ParcelaID',
    })
    id: number;

    @ManyToOne(type => Conta, conta => conta.parcelas)
    @JoinColumn({
        name: 'ContaID',
    })
    conta: Conta;

    @Column({
        name: 'Valor',
        type: 'decimal',
        precision: 9,
        scale: 2,
    })
    valor: number;

    @Column({
        name: 'DataVencimento',
        type: 'date',
    })
    dataVencimento: Date;

    @Column({
        name: 'Status',
        type: 'enum',
        enum: StatusParcela,
    })
    status: StatusParcela;

    @OneToOne(type => Transacao, transacao => transacao.parcela)
    transacao?: Transacao;
}
