import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Conta } from 'src/conta/conta.model';
import moment = require('moment');
import { ContaException } from '../conta/conta.exception';

export class ParseContaPipe implements PipeTransform<any, any> {

    transform(value: any, metadata: ArgumentMetadata) {
        if (!value.dataVencimento) {
            throw new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA);
        }

        const conta: any = value;
        conta.dataVencimento = moment(value.dataVencimento, 'YYYY-MM-DD').toDate();
        return conta;
    }

}
