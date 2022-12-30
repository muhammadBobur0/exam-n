import { read, write } from "../utils/model.js"
import jwt from '../utils/jwt.js';
import { Hash } from '../utils/hash.js';



 export const  adminPadding = (req, res) => {
  try {

      let posts = read("posts")

      let pendining = posts.filter(post => post.status == "pending")

      res.status(200).json({ status: 200, data: pendining })
  } catch (error) {

      res.status(403)
  }
}

export  const usersapply = (req, res) => {
  try {
      let posts = read("posts")
      let { postId } = req.params

      let post = posts.find(post => post.postId == postId)

      if (post.status == "pending") {
          post.status = "active"

          write("posts", posts)
          res.status(200).json({ status: 200, data: post })
      } else {
          res.status(400).json({ status: 400, message:"post not in pending"})
      }
  } catch (error) {
      res.status(400).json({ status: 400, message: error.message })
  }
}

export const usersreject = (req, res) => {
  try {
      let posts = read("posts")
      let { postId } = req.params

      let post = posts.find(post => post.postId == postId)
      
      if (post.status == "pending") {
          post.status = "rejected"

          write("posts", posts)
          res.status(200).json({ status: 200, data: post })
      } else {
          res.status(400).json({ status: 400, message:"post not in pending"})
      }
  } catch (error) {
      res.status(400).json({ status: 400, message: error.message })
  }
}


export const UserSign = (req, res) => {
	try {
		let { username, password } = req.body;

		password = Hash(password);
		let admins = read('admins');


		let use = admins.find(
			(user) => user.username == username && user.password == password
		);

		if (!use) {
			throw Error("user not found")
		}

		res.status(200).send({ status: 200, token: jwt.sign(use.adminId) });
	} catch (error) {
		res.status(404).send({ status: 404, message: error.message });
	}
};