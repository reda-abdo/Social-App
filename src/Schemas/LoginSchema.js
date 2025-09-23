import * as zod from 'zod'
export const loginSchema = zod.object({
    email: zod.string()
        .nonempty('email is recwired')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'invalid emai'),
    password: zod.string()
        .nonempty('password is recwired')
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character  '),
})


