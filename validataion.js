import {body} from "express-validator"

export const registerValidation = [
  body("email", "Email must be valid").isEmail(),
  body(
    "password",
    "Password must be longer than 5 and shorter than 32"
  ).isLength({min: 5, max: 32}),
  body("fullName", "name is required").isLength({min: 3}),
  body("avatarUrl", "Uncorrect url").optional().isURL()
]

export const loginValidation = [
  body("email", "Email must be valid").isEmail(),
  body(
    "password",
    "Password must be longer than 5 and shorter than 32"
  ).isLength({min: 5, max: 32})
]

export const postCreateValidation = [
  body("title", "Write title").isLength({min: 3}).isString(),
  body("text", "Write text").isLength({min: 10}).isString(),
  body("tags", "Uncorrect tags").optional().isString(),
  body("imageUrl", "Uncorrect url").optional().isString()
]
