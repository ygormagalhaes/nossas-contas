import { Transacao } from './../transacao/transacao.model';
import { Parcela } from './parcela.model';
import { Usuario } from './../usuario/usuario.model';
import { TipoConta } from './tipo-conta.enum';
import { StatusConta } from './status-conta.enum';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity({
    name: 'Contas',
})
export class Conta {

    @PrimaryGeneratedColumn({
        name: 'ID',
    })
    id: number;

    @Column({
        name: 'DataLancamento',
        type: 'date',
    })
    dataLancamento: Date;

    @Column({
        name: 'DataVencimento',
        type: 'date',
    })
    dataVencimento: Date;

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
        enum: TipoConta,
    })
    tipo: TipoConta;

    usuario: Usuario; // TODO: Implementar entidade

    @Column({
        name: 'QuantidadeParcelas',
        type: 'tinyint',
        nullable: true,
    })
    quantidadeParcelas?: number;

    @OneToMany(type => Parcela, parcela => parcela.conta)
    parcelas?: Parcela[];

    @Column({
        name: 'Status',
        type: 'enum',
        enum: StatusConta,
    })
    status: StatusConta;

    // Caso não seja uma conta parcelada, este campo é usado para mapear a transação de liquidação
    @OneToOne(type => Transacao, transacao => transacao.conta)
    transacao?: Transacao;

    @Column({
        name: 'Descricao',
        type: 'varchar',
        length: 255,
    })
    descricao: string;
}
