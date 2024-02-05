import { IsString } from 'class-validator';

export class signUpDTO {
  @IsString({ message: 'Please insert string' })
  username: string;

  @IsString({ message: 'Please insert string' })
  password: string;
}
