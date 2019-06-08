import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NegocioExceptionFilter } from './core/negocio-exception.filter';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new NegocioExceptionFilter());
    await app.listen(3000);
}
bootstrap();
