import { Parcela } from './../conta/parcela.model';
import { Usuario as Usuario } from './../usuario/usuario.model';
import { TipoTransacao } from './tipo-transacao.enum';
import { Conta } from '../conta/conta.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity({
    name: 'TB_TRS', // TODO: Atualizar README com mnemonicos da nomenclatura do BD.
})
export class Transacao {

    @PrimaryGeneratedColumn({
        name: 'ID',
    })
    id: number;

    @Column({
        name: 'VLR_TRS',
        type: 'decimal',
        precision: 9,
        scale: 2,
    })
    valor: number;

    @Column({
        name: 'TIP_TRS',
        type: 'enum',
        enum: TipoTransacao,
    })
    tipo: TipoTransacao;

    usuario: Usuario; // TODO: Implementar

    @Column({
        name: 'DAT_TRS',
        type: 'date',
    })
    data: Date;

    @Column({
        name: 'DSC_TRS',
        type: 'varchar',
        length: 255,
    })
    descricao: string;

    @OneToOne(type => Conta, conta => conta.transacao, {
        nullable: true,
    })
    @JoinColumn({
        name: 'CNT_ID',
    })
    conta?: Conta;

    @OneToOne(type => Parcela, {
        nullable: true,
    })
    @JoinColumn({
        name: 'PCL_ID',
    })
    parcela?: Parcela;

    @Column({
        name: 'TRS_MSL',
        type: 'boolean',
        nullable: true,
    })
    mensal?: boolean;
}
