import express from "express"

const app = express()

app.listen(4444, (err) => {
  if (err) {
    console.log(err)
  }
  console.log("server started")
})

app.get("/", (req, res) => {
  res.send("Hello World!")
})
