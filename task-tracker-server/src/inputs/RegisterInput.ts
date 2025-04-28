import { IsEmail, Length, } from 'class-validator';

export class RegisterInput {
    @IsEmail()
    email!: string;

    @Length(6, 100)
    password!: string;
}