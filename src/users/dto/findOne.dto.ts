import { IsString } from 'class-validator';

export class findOne {
  @IsString({ message: 'Please insert string' })
  username: string;
}
