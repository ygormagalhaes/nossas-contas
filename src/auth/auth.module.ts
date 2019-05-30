import { UsuarioModule } from './../usuario/usuario.module';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsuarioModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: 'secretKey',
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
    providers: [
        AuthService,
        JwtStrategy,
    ],
})
export class AuthModule { }
