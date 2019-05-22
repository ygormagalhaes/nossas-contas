import { Cartao } from './cartao.model';
import { Conta } from './conta.model';
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ContaNegocio } from './conta.negocio';
import { CartaoRepository } from './cartao.repository';
import { ContaService } from './conta.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { ContaController } from './conta.controller';
import { ContaRepository } from './conta.repository';

@Module({
    imports: [
        UsuarioModule,
        TypeOrmModule.forFeature([
            ContaRepository,
            CartaoRepository,
        ]),
    ],
    providers: [
        ContaNegocio,
        ContaService,
    ],
    exports: [
        ContaService,
    ],
    controllers: [ContaController],
})
export class ContaModule { }
