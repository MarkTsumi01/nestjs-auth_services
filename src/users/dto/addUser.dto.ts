import { IsString } from 'class-validator';

export class addUsers {
  @IsString({ message: 'Please insert string' })
  username: string;

  @IsString({ message: 'Please insert string' })
  password: string;
}
