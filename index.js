import express from "express"
import mongoose from "mongoose"
import multer from "multer"

import {
  registerValidation,
  loginValidation,
  postCreateValidation
} from "./validataion.js"
import {handleValidationErrors, checkAuth} from "./utils/index.js"
import {userController, postController} from "./controllers/index.js"

mongoose
  .connect(
    "mongodb+srv://admin:admin@nerv.f3uogur.mongodb.net/blog?retryWrites=true&w=majority&appName=nerv"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads")
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({storage})

app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  userController.login
)
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  userController.register
)
app.get("/auth/me", checkAuth, userController.getMe)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get("/posts", postCreateValidation, postController.getAll)
app.get("/posts/:id", postController.getOne)
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postController.create
)
app.delete("/posts/:id", checkAuth, postController.remove)
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postController.update
)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log("Server running on port 4444")
})
