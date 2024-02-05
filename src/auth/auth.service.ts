import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signInDTO } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entity/user.entity';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Signup
  async signUp(signupdata: signInDTO): Promise<Users> {
    const salt = parseInt(process.env.SALT, 10);
    const password = signupdata.password;
    const hash = await bcrypt.hash(password, salt);
    signupdata.password = hash;

    return await this.userService.addUsers(signupdata);
  }

  // Signin
  async signIn(
    signindata: signInDTO,
  ): Promise<{ access_token: string; status: string }> {
    const user = await this.userService.findOne(signindata.username);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      signindata.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      status: 'login success',
    };
  }
}
