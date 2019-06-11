import { TipoConta } from './tipo-conta.enum';
import { ApiModelProperty } from '@nestjs/swagger';
import { EnumUtils } from '../utils/enum.utils';

export class ContaDTO {
    @ApiModelProperty()
    dataVencimento: string;

    @ApiModelProperty({enum: EnumUtils.getValores(TipoConta)})
    tipo: TipoConta;

    @ApiModelProperty()
    valor: number;
}
