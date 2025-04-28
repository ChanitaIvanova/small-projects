import { Button } from "./button";
import { useState } from "react";
import RegisterFormData from "../../types/register-form";
import { FormField } from "./form-field";
import { registerUser } from "../../services/auth.service";
import { useForm } from "../../hooks/useForm";
import EmailSchema from "../../validations/email.validator";
import { ConfirmPasswordSchema, PasswordSchema } from "../../validations/password.validator";
import { useNavigate } from "react-router-dom"

const validators = {
    email: [EmailSchema],
    password: [PasswordSchema],
    confirmPassword: [ConfirmPasswordSchema]
};

export function Register() {
    const navigate = useNavigate();
    const initialValues: RegisterFormData = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    const { formData, errors, handleChange, handleBlur, validateAllFields } =
        useForm<RegisterFormData>(initialValues, validators);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateAllFields()) {
            try {
                await registerUser(formData);
                setSubmitError(null);
                navigate("/")
            } catch (err: any) {
                setSubmitError(err.message || "Registration failed");
            }
        }
    };

    return (
        <div className="mx-auto">
            <form onSubmit={handleSubmit} className="size-fit p-10 rounded-lg shadow-lg dark:bg-gray-600">
                <FormField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    required
                />

                <FormField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    required
                />

                <FormField
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.confirmPassword}
                    required
                />

                {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

                <Button className="btn-primary" type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
}