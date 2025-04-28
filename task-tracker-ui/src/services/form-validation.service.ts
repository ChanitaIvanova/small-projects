import { z } from 'zod';
import extractError from "../lib/error-extractor";

export type Validator = z.ZodType<any, any, any>;

export interface FieldValidator {
    name: string;
    validators: Validator[];
}

export const validateField = (field: string, formData: any, validators: Record<string, Validator[]>) => {
    try {
        const fieldValidators = validators[field];
        if (!fieldValidators.length) return null;

        fieldValidators.forEach(validator => validator.parse(formData));
        return null; // No error
    } catch (err: any) {
        console.log(err);
        return extractError(err, field);
    }
};

export const validateForm = (formData: any, validators: Record<string, Validator[]>) => {
    const errors: Record<string, string | null> = {};
    let isValid = true;

    for (const [field, fieldValidators] of Object.entries(validators)) {
        try {
            fieldValidators.forEach(validator => validator.parse(formData));
        } catch (err: any) {
            isValid = false;
            errors[field] = extractError(err, field);
        }
    }

    return { isValid, errors };
};