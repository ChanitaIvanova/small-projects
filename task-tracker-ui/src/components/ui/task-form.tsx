import { Button } from "./button";
import { useState } from "react";
import RegisterFormData from "../../types/register-form";
import { FormField } from "./form-field";
import { registerUser } from "../../services/auth.service";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom"
import { TextSchema } from "../../validations/text.validator";
import TaskFormData from "../../types/task-form";

const validators = {
    title: [TextSchema("title", 100, 1)],
    description: [TextSchema("description", 1000, 1)]
};

export function Register() {
    const navigate = useNavigate();
    const initialValues: TaskFormData = {
        title: "",
        description: "",
        dueDate: "",
        tags: []
    };

    const { formData, errors, handleChange, handleBlur, validateAllFields } =
        useForm<TaskFormData>(initialValues, validators);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateAllFields()) {
            try {
                //await registerUser(formData);
                setSubmitError(null);
                navigate("/tasks")
            } catch (err: any) {
                setSubmitError(err.message || "Task creation failed");
            }
        }
    };

    return (
        <div className="mx-auto">
            <form onSubmit={handleSubmit} className="size-fit p-10 rounded-lg shadow-lg dark:bg-gray-600">
                <FormField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.title}
                    required
                />

                <FormField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description}
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