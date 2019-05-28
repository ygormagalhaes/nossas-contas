import { UsuarioRepository } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioNegocio } from './usuario.negocio';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioRepository])],
    providers: [UsuarioService, UsuarioNegocio],
    exports: [UsuarioService],
    controllers: [UsuarioController],
})
export class UsuarioModule { }
