import { IsEmail, Length, } from 'class-validator';

export class RegisterInput {
    @Length(2, 50)
    name!: string;

    @IsEmail()
    email!: string;

    @Length(6, 100)
    password!: string;
}