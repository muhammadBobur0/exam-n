import { read, write } from '../utils/model.js';

let GET = (req, res) => {
	let { online, subcategory, date, name } = req.query;
	name = name?.toLowerCase();
	let posts = read('posts');
	
	posts = posts.filter((posts) => {
		posts.user.fullname = posts.user.fullname.toLowerCase();
		let ofline = online
		? posts.status == online && posts.status != 'pending'
		: true;
		let subcate = subcategory ? posts.subcategory_id == subcategory : true;
		let data = date ? posts.dateY == date : true;
		let username = name ? posts.user.fullname.includes(name) : true;
		return ofline && subcate && data && username;
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


export { GET, NEWPOST };
