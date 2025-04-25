import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationError } from "./errors";
export class ValidationUtil {
    static async validateInput(input: any, model: any) {
        const instance = plainToInstance(model, input);
        const errors = await validate(instance);

        if (errors.length > 0) {
            const messages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new ValidationError(`Validation failed: ${messages.join(', ')}`);
        }
    }
}

