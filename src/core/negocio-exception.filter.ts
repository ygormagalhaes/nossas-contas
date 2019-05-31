import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { NegocioException } from './negocio-exception';

@Catch(NegocioException)
export class NegocioExceptionFilter implements ExceptionFilter {
    catch(exception: NegocioException, host: ArgumentsHost) {
        throw new BadRequestException(exception.message);
    }
}
