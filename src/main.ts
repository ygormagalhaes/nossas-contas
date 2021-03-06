import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NegocioExceptionFilter } from './core/negocio-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new NegocioExceptionFilter());

    const options = new DocumentBuilder()
        .setTitle('Financeirinho')
        .setDescription('Documentação da API Financeirinho')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
