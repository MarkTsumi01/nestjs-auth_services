import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { signUpDTO } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { signInDTO } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() newSignup: signUpDTO) {
    return await this.authService.signUp(newSignup);
  }

  @Post('/signin')
  async signIn(@Body() signIn: signInDTO) {
    return await this.authService.signIn(signIn);
  }
}
