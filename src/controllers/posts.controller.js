import { read, write } from '../utils/model.js';
import fs from 'fs'
import path from 'path';

let GET = (req, res) => {
	let { type, subcategory, date, name } = req.query;
	
	name = name?.toLowerCase();
	let posts = read('posts');
	
	posts = posts.filter((posts) => {
		if(posts.status != 'rejected'){
			posts.user.fullname = posts.user.fullname.toLowerCase();
		let ofline = type
		? posts.type == type && posts.status != 'pending' && posts.status != 'rejected'
		: true;

		let subcate = subcategory ? posts.subcategory == subcategory && posts.status != 'pending' && posts.status != 'rejected' : true;
		let data = date ? posts.dateY == date && posts.status != 'pending' && posts.status != 'rejected' : true;
		let username = name ? posts.user.fullname.includes(name) && posts.status != 'pending' && posts.status != 'rejected' : true;

		return ofline && subcate && data && username;
		}
	});
	
	res.status(200).send({ status: 200, data: posts });
};



let NEWPOST = (req, res) => {
	try {
		let posts = read("posts")
		let {
			dateY,
			dateH,
			job,
			subcategory,
			type,
			fullname,
			phone,
			description,
			title,
			text
		} = req.body

		subcategory = Number(subcategory)
		
		let { postImg } = req.files
		
		let postName = Date.now() + postImg.name
		
		fs.writeFileSync(path.resolve("uploads", postName), postImg.data, "utf-8")
		
		let newPost = {
			title,
			text,
			description,
			dateY,
			dateH,
			subcategory,
			type,
			postImg: postName,
			isDeleted: false,
			status: "pending",
			count: 0,
			postId: posts.at(-1)?.postId + 1 || 1,
			user: {
				fullname,
				phone,
				job
			},
			watched: []
		}
		
		posts.push(newPost)
		
		write("posts", posts)
		
		res.status(201).json({ status: 201, message: "new post added", date: newPost })
	} catch (error) {
		res.status(400).json({ status: 400, message: error.message })
	}
}

const GetParams = (req, res)=>{
	try {
		let {id} = req.params
		let posts = read('posts')
		
		let watchet =	posts.find(post => post.watched.find(watch => watch == req.ip) && post.status != "pending" &&  post.status != "rejected" )
		
		if(watchet)  {
			watchet = posts.find(post => post.postId == id)	
			return	res.send(watchet)
		} 

	watchet =	posts.find(post =>{
		post.watched.push(req.ip.toString())
		post.count = post.count + 1
		return post.postId == id &&  post.status != "pending" &&  post.status != "rejected"
	})

		write("posts", posts)
		
		res.send(watchet)
		
	} catch (error) {
		res.status(404).send({message: error.message})
	}
	
}


const getImage = (req, res)=>{
	try {
		let { imgName } = req.params

		if (!fs.readFileSync(path.resolve("uploads" , imgName), "utf-8")) {
			throw Error("Img not found")
		}

		res.sendFile(path.resolve("uploads", imgName))
	} catch (error) {
		res.status(404).json({status:404 , message: error.message})
	}

}



export { GET, NEWPOST , GetParams, getImage};
