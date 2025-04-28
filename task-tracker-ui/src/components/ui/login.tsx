import { Button } from "./button";
import { useState } from "react";
import { FormField } from "./form-field";
import { loginUser } from "../../services/auth.service";
import { useForm } from "../../hooks/useForm";
import EmailSchema from "../../validations/email.validator";
import { PasswordSchema } from "../../validations/password.validator";
import { useLocation, useNavigate } from "react-router-dom"
import LoginFormData from "../../types/login-form";
import { useDispatch } from "react-redux"
import { login } from "../../store/authSlice";

const validators = {
    email: [EmailSchema],
    password: [PasswordSchema]
};

export function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const initialValues: LoginFormData = {
        email: "",
        password: ""
    };
    const dispatch = useDispatch()

    const { formData, errors, handleChange, handleBlur, validateAllFields } =
        useForm<LoginFormData>(initialValues, validators);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateAllFields()) {
            try {
                const token = await loginUser(formData);
                setSubmitError(null);
                dispatch(login(token));
                navigate(from, { replace: true })
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
                {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

                <Button className="btn-primary" type="submit" >
                    Login
                </Button>
            </form>
        </div>
    );
}