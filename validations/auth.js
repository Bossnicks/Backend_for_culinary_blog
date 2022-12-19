import {body} from "express-validator";

export const loginValidation = [
    body("email").isEmail(),
    body("password").isLength({ min : 5}),
];

export const registerValidation = [
    body("email").isEmail(),
    body("password").isLength({ min : 5}),
    body("fullName").isLength({ min: 3}),
    body("avatarUrl").optional().isURL(),
];

export const postCreateValidation = [
    body("title", "Введите заголовок статьи").isLength({ min: 3}).isString(),
    body("text", "Введите текст статьи").isLength({ min : 3}).isString(),
    body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(),
    body("imageUrl").optional().isString(),
];

export const commentCreateValidation = [
    body('comment', "Слишком маленький комментарий").isLength({min: 0}),
]