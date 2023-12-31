import {z} from 'zod'

const invalid_type_error = 'Invalid type provided for this field.';
const required_error = 'This field cannot be empty.';

export const SignUpSchema = z.object({
    email: z
        .string({invalid_type_error, required_error})
        .email({message: "Not valid email."})
        .min(1, {message: required_error}),
    password: z
        .string({invalid_type_error, required_error})
        .min(6, {message: "Password must be at least 6 characters."}),
    first_name: z
        .string({invalid_type_error, required_error})
        .min(1, {message: required_error}),
    last_name: z
        .string({invalid_type_error, required_error})
        .min(1, {message: required_error})
})
export const LogInSchema = z.object({
    email: z
        .string({invalid_type_error, required_error})
        .email({message: "Not valid email."})
        .min(1, {message: required_error}),
    password: z
        .string({invalid_type_error, required_error})
})


export type validationSchemaType = z.infer<typeof SignUpSchema>
export type validationLoginSchemaType = z.infer<typeof LogInSchema>