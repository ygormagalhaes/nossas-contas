import { UtilsModule } from './../utils/utils.module';
import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { ContaController } from './conta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conta } from './conta.model';
import { ContaDAO } from './conta.dao';

@Module({
    imports: [UsuarioModule, UtilsModule, TypeOrmModule.forFeature([Conta])],
    providers: [ContaService, ContaDAO],
    exports: [ContaService],
    controllers: [ContaController],
})
export class ContaModule { }
