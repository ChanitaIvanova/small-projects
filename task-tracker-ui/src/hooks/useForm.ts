import { useState } from "react";
import { Validator, validateField, validateForm } from "../services/form-validation.service";

export function useForm<T>(initialValues: T, validators: Record<string, Validator[]>) {
    const [formData, setFormData] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const error = validateField(name, formData, validators);

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const validateAllFields = () => {
        const { isValid, errors: validationErrors } = validateForm(formData, validators);
        const safeErrors = Object.fromEntries(
            Object.entries(validationErrors).map(([key, value]) => [key, value || null])
        );
        setErrors(safeErrors);
        return isValid;
    };

    return {
        formData,
        errors,
        handleChange,
        handleBlur,
        validateAllFields,
        setFormData,
    };
}