import { LOGIN, REGISTER } from "../graphql/user";
import { LoginInput, RegisterInput } from "../graphql/generated";
import { client } from "../lib/apollo-client";

export const registerUser = async (formData: RegisterInput) => {
    const { data: { error } } = await client.mutate({
        mutation: REGISTER,
        variables: {
            registerInput: { email: formData.email, password: formData.password }
        }
    })

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    // Return response or throw error based on API response
    return { success: true, message: "Registration successful" };
};

export const loginUser = async (formData: LoginInput) => {
    const { data: { error, login: { token } } } = await client.mutate({
        mutation: LOGIN,
        variables: {
            loginInput: { email: formData.email, password: formData.password }
        }
    })

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    // Return response or throw error based on API response
    return token;
};