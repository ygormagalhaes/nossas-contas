import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaNegocio } from './conta.negocio';
import { CartaoRepository } from './cartao.repository';
import { ContaService } from './conta.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { ContaController } from './conta.controller';
import { ContaRepository } from './conta.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        UsuarioModule,
        TypeOrmModule.forFeature([
            ContaRepository,
            CartaoRepository,
        ]),
        AuthModule,
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
