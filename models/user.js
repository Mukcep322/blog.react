import mongoose from "mongoose"

const userSchmea = new mongoose.Schema(
  {
    passwordHash: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullName: {
      type: String,
      required: true
    },
    avatar: String
  },
  {
    timestamps: true
  }
)

export default mongoose.model("User", userSchmea)
