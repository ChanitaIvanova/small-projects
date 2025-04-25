import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {

    static async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    static buildToken(userId: string): string {
        return jwt.sign({ userId }, process.env.AUTH_SECRET!);
    }

    static signToken(userId: string): string {
        return jwt.sign({ userId: userId }, process.env.AUTH_SECRET!);
    }

    static decodeToken(token: string): { userId: string } {
        return jwt.verify(token, process.env.AUTH_SECRET!) as { userId: string };
    }

}

