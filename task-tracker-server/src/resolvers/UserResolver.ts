import { UserModel } from "../models/User";

import bcrypt from 'bcryptjs';
import { RegisterInput } from "../inputs/RegisterInput";
import { AuthService } from "../services/AuthService";
import { LoginInput } from "../inputs/LoginInput";
import { ValidationUtil } from "../utils/Validation.util";
import { AuthenticationError, EmailInUseError, ValidationError } from "../utils/errors";
import { asyncErrorHandler } from "../utils/ErrorHandler";
const userFromContext = async ({ }, context: { userId: string }) => {
    if (!context.userId) throw new AuthenticationError();
    return await UserModel.findById(context.userId);
}

const register = async ({ input }: { input: RegisterInput }) => {
    ValidationUtil.validateInput(RegisterInput, input);

    const existing = await UserModel.findOne({ email: input.email });
    if (existing) throw new EmailInUseError();

    const hashedPassword = await AuthService.hashPassword(input.password);
    const user = new UserModel({ ...input, password: hashedPassword });
    await user.save();

    const token = AuthService.buildToken(user.id);
    return { token, user };
};

const login = async ({ input }: { input: LoginInput }) => {
    ValidationUtil.validateInput(LoginInput, input);
    const user = await UserModel.findOne({ email: input.email });
    if (!user) throw new ValidationError();

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) throw new ValidationError();

    const token = AuthService.signToken(user.id);
    return { token, user };
}
export const userResolvers = {
    me: asyncErrorHandler(userFromContext),
    register: asyncErrorHandler(register),
    login: asyncErrorHandler(login)
};

