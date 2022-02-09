import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config'

const jwtConfig = config.get('jwt')

@Module({
	imports: [
								// 기본전략 jwt 
		PassportModule.register({defaultStrategy: 'jwt'}),
		JwtModule.register({
			// secret key
			secret: process.env.JWT_SECRET || jwtConfig.secret,
			signOptions: {
				// 정해진 시간 이후에는 토큰이 유효하지 않게 된다.
				expiresIn: jwtConfig.expiresIn,
			}
		}),
		TypeOrmModule.forFeature([UserRepository])
	],
	controllers: [AuthController],
	// auth에서 사용하기 위해서
	providers: [AuthService, JwtStrategy],
	// 다른 모듈에서 사용해주기 위해서 
	exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
