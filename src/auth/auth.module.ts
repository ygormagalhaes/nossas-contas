import { HttpStrategy } from './http.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, HttpStrategy]
})
export class AuthModule {}
