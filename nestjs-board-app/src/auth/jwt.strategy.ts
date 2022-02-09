import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./auth.repository";
import { User } from "./user.entity";
import * as config from 'config'

const jwtConfig = config.get('jwt')

// configuration 같은거임
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository) {
		// 부모 컴포넌트를 사용하기 위해서 사용함 super()
		super({
			secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			})
	}
	
	async validate(payload) {
		const { username } = payload;
		const user: User = await this.userRepository.findOne({ username })
		
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}