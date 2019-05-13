import { Transacao } from './../transacao/transacao.model';
import { Parcela } from './parcela.model';
import { Usuario } from './../usuario/usuario.model';
import { TipoConta } from './tipo-conta.enum';
import { StatusConta } from './status-conta.enum';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity({
    name: 'TB_CNT',
})
export class Conta {

    @PrimaryGeneratedColumn({
        name: 'ID',
    })
    id: number;

    @Column({
        name: 'DAT_LCT',
        type: 'date',
    })
    dataLancamento: Date;

    @Column({
        name: 'DAT_VCT',
        type: 'date',
    })
    dataVencimento: Date;

    @Column({
        name: 'VLR_CNT',
        type: 'decimal',
        precision: 9,
        scale: 2,
    })
    valor: number;

    @Column({
        name: 'TIP_CNT',
        type: 'enum',
        enum: TipoConta,
    })
    tipo: TipoConta;

    usuario: Usuario; // TODO: Implementar entidade

    @Column({
        name: 'QTD_PCL',
        type: 'tinyint',
        nullable: true,
    })
    numeroParcelas?: number;

    @OneToMany(type => Parcela, parcela => parcela.conta)
    parcelas?: Parcela[];

    @Column({
        name: 'STA_CNT',
        type: 'enum',
        enum: StatusConta,
    })
    status: StatusConta;

    // Caso não seja uma conta parcelada, este campo é usado para mapear a transação de liquidação
    @OneToOne(type => Transacao, transacao => transacao.conta)
    transacao?: Transacao;

    @Column({
        name: 'DSC_CNT',
        type: 'varchar',
        length: 255,
    })
    descricao: string;
}
