import { Hash } from '../utils/hash.js';
import { read } from '../utils/model.js';
import jwt from '../utils/jwt.js';

const UserSign = (req, res) => {
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

export default UserSign;
