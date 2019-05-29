import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { NegocioExceptionFilter } from '../src/core/negocio-exception.filter';

// TODO: Mockar idas ao banco ou utilizar banco específico para testes (ver configuração orgmconfig.json...)
xdescribe('UsuarioController (e2e)', () => {
    let app: any;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new NegocioExceptionFilter());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/usuario (POST)', async () => {
       await request(app.getHttpServer())
            .post('/usuario')
            .send({
                email: 'emaildoygor@gmail.com',
                senha: '12345678',
            })
            .expect(HttpStatus.CREATED);
    });

});

/*
xdescribe('ContaController (e2e)', () => {
    let app;
    let connection: Connection;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new NegocioExceptionFilter());
        connection = moduleFixture.get<Connection>(Connection);
        await app.init();
    });

    afterAll(async () => {
        await connection.close();
    });

    it('/conta (POST)', async done => {
        const conta = {
            dataVencimento: '2019-05-20',
            valor: 125.99,
            tipo: TipoConta.DINHEIRO,
            descricao: 'Camiseta Volcom',
        };

        await request(app.getHttpServer())
            .post('/conta')
            .send(conta)
            .expect(201);

        done();
    });
});
*/
