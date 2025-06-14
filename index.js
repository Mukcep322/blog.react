import express from "express"
import mongoose from "mongoose"
import {registerValidation} from "./validations/auth.js"
import checkAuth from "./utils/checkAuth.js"

import * as userController from "./controllers/userController.js"

mongoose
  .connect(
    "mongodb+srv://admin:admin@nerv.f3uogur.mongodb.net/blog?retryWrites=true&w=majority&appName=nerv"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err))

const app = express()
app.use(express.json())

app.get("/", (res) => {
  res.send("Hello World")
})

app.post("/auth/login", userController.login)
app.post("/auth/register", registerValidation, userController.register)
app.get("/auth/me", checkAuth, userController.getMe)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log("Server running on port 4444")
})
