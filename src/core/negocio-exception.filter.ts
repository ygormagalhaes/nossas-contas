import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { NegocioException } from './negocio-exception';
import { Response } from 'express';

@Catch(NegocioException)
export class NegocioExceptionFilter implements ExceptionFilter {
    catch(exception: NegocioException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = HttpStatus.BAD_REQUEST;

        response
            .status(status)
            .json({
                message: exception.message,
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
