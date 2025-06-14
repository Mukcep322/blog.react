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
