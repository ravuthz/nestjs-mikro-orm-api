import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';

const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    return {
      secret: config.get<string>('jwt.secretKey'),
      signOptions: {
        expiresIn: config.get<string>('jwt.expiresIn'),
      },
    };
  },
  inject: [ConfigService],
});

export const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
  property: 'user',
  session: false,
});

@Module({
  imports: [jwtModule, passportModule, UserModule],
  controllers: [AuthController],
  providers: [PassportModule, AuthService, JwtStrategy],
  exports: [jwtModule, passportModule, AuthService, JwtStrategy, UserModule],
})
export class AuthModule {}
