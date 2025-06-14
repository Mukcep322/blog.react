import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

mongoose
  .connect("href")
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err)
  })

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.post("/auth/login", (req, res) => {
  console.log(req.body)

  const token = jwt.sign(
    {
      email: req.body.email,
      fullname: req.body.fullName
    },
    "iltw"
  )
  res.json({
    success: true,
    token
  })
})

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log("Server running on port 4444")
})
