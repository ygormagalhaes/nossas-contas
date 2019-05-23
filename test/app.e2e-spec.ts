import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';
import { NegocioExceptionFilter } from '../src/core/negocio-exception.filter';
import { TipoConta } from './../src/conta/tipo-conta.enum';
import { HttpStatus } from '@nestjs/common';

describe('UsuarioController (e2e)', () => {

    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new NegocioExceptionFilter());
        await app.init();
    });

    it('/usuario (POST)', async done => {
       await request(app.getHttpServer())
            .post('/usuario')
            .send(undefined)
            .expect(HttpStatus.BAD_REQUEST)
            .then(res => {
                expect(res.body).toBeDefined();
            });
    });

});

xdescribe('ContaController (e2e)', () => {
    let app;
    let connection: Connection;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalFilters(new NegocioExceptionFilter());
        connection = moduleFixture.get<Connection>(Connection);
        await app.init();
    });

    afterEach(async () => {
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
