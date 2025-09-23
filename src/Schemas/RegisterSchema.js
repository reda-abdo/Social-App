import * as zod from 'zod'




export const registerSchema = zod.object({

    name: zod.string()
        .nonempty('name is recwired')
        .min(3, 'at lest 3 character')
        .max(20, 'max caracter 20'),
    email: zod.string()
        .nonempty('email is recwired')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'invalid emai'),
    password: zod.string()
        .nonempty('password is recwired')
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character  '),
    rePassword: zod.string()
        .nonempty('confirm password is recwired'),

    dateOfBirth: zod.coerce.date().refine((date )=> {
            const birthDate = date.getFullYear();
            const now = new Date().getFullYear();
            const age = now - birthDate;
            return age >= 18;
        }, { message: 'age musy be older than 18 years' }
        ),
    gender: zod.string()
    .nonempty("Gender is required")
        .regex(/^(male|female)$/, 'enter valid ginder')




}).refine((data) => data.password === data.rePassword, { message: 'conferm password and password must br mathe', path: ['rePassword'] })



