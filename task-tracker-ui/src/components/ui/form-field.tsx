import { Input } from "./input";
import { Label } from "./label";

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string | null;
    required?: boolean;
}

export function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    required = false,
}: FormFieldProps) {
    return (

        <div className="flex items-center space-x-2 mb-2">
            <Label className="w-24" htmlFor={name}>
                {label}
            </Label>
            <div className="flex flex-col">
                <Input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
}