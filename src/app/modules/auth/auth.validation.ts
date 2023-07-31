import { z } from 'zod';

const loginZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'Phone number is required'
        }),
        password: z.string({
            required_error: "Password is required"
        })
    }),
});

export const AuthValidation = {
    loginZodSchema,
};
