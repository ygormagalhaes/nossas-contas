import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio-exception';

@Catch(NegocioException)
export class NegocioExceptionFilter implements ExceptionFilter {

    catch(exception: NegocioException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();

        console.error(exception);

        response
            .status(HttpStatus.BAD_REQUEST)
            .json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: exception.message,
            });
    }

}