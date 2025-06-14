import PostModel from "../models/post.js"

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec()
    res.json(posts)
  } catch (err) {
    res.status(500).json({
      message: "Opps... can't get all posts"
    })
  }
}

export const getOne = (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndUpdate(
      {
        _id: postId
      },
      {
        $inc: {viewsCount: 1}
      },
      {
        returnDocument: "after"
      }
    ).then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "can`t find post"
        })
      }

      res.json(post)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      messgae: "can`t get post"
    })
  }
}

export const remove = (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndDelete({
      _id: postId
    }).then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "can`t find post"
        })
      }

      res.json({
        success: true
      })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      messgae: "can`t remove post"
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    })

    const post = await doc.save()

    res.json(post)
  } catch (err) {
    res.status(500).json({
      message: "Opps... can't create a post"
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id

    PostModel.findOneAndUpdate(
      {
        _id: postId
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags
      }
    ).then((post) => {
      if (!post) {
        return res.status(404).json({
          message: "can`t find post"
        })
      }

      res.json({
        success: true
      })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      messgae: "can`t update post"
    })
  }
}
