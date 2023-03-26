import {checkSchema} from "express-validator";

const authValidationSchema = checkSchema({
    username: {
        exists: {
            errorMessage: 'Введите логин',
            options: {checkFalsy: true},
            bail: true
        },
        isString: {
            errorMessage: 'Логин должен быть строкой'
        },
        isLength: {
            errorMessage: 'Логин не должен быть короче 4 символов',
            options: {min: 4}
        },
        isAlphanumeric: {
            errorMessage: 'Логин должен содержать только английские символы и цифры',
        },
    },

    name: {
        exists: {
            errorMessage: 'Введите имя пользователя',
            options: {checkFalsy: true},
            bail: true
        },
        isString: {
            errorMessage: 'Имя пользователя должно быть строкой',
        },
        isLength: {
            errorMessage: 'Имя пользователя не должно быть короче 3 символов',
            options: {min: 3}
        }
    },

    password: {
        exists: {
            errorMessage: 'Введите пароль',
            options: {checkFalsy: true},
            bail: true
        },
        isString: {
            errorMessage: 'Пароль должен быть строкой'
        },
        isLength: {
            errorMessage: 'Пароль не должен быть короче 6 символов',
            options: {min: 6}
        }
    }
})

export default authValidationSchema