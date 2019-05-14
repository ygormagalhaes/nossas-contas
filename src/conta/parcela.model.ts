import { Conta } from './conta.model';
import { StatusParcela } from './status-parcela.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Transacao } from 'src/transacao/transacao.model';

@Entity({
    name: 'TB_PCL',
})
export class Parcela {

    @PrimaryGeneratedColumn({
        name: 'ID',
    })
    id: number;

    @ManyToOne(type => Conta, conta => conta.parcelas)
    @JoinColumn({
        name: 'CNT_ID',
    })
    conta: Conta;

    @Column({
        name: 'VLR_CNT',
        type: 'decimal',
        precision: 9,
        scale: 2,
    })
    valor: number;

    @Column({
        name: 'DAT_VCT',
        type: 'date',
    })
    dataVencimento: Date;

    @Column({
        name: 'TIP_CNT',
        type: 'enum',
        enum: StatusParcela,
    })
    status: StatusParcela;

    @OneToOne(type => Transacao, transacao => transacao.parcela)
    transacao?: Transacao;
}
