const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.status(400).send({ message: "Fill out all required information" });
		return;
	}

	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashPassword = bcrypt.hashSync(req.body.password, salt);

	const emailExist = await User.findOne({ email: req.body.email });
	const usernameExist = await User.findOne({ username: req.body.username });

	if (emailExist || usernameExist) {
		res.status(403).send({ message: "User is exist" });
		return;
	}

	User.create({
		email: req.body.email,
		username: req.body.username,
		password: hashPassword,
		highScore: 0,
	})
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.status(500).send({ message: err });
		});
};

exports.login = (req, res) => {
	if (!req.body.email || !req.body.password) {
		res.status(400).send({ message: "Isi semua data" });
		return;
	}

	User.findOne({
		email: req.body.email,
	}).then((user) => {
		if (!user) {
			return res.status(401).send({ message: "User belum terdaftar" });
		}

		let passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
			});
		}

		let token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				highScore: user.highscore,
			},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: 86400, // 24 hours
			}
		);

		res.status(200).send({
			id: user.user_id,
			username: user.username,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			highScore: user.highscore,
			accessToken: token,
		});
	});
};

exports.auth = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}
		res.status(200).send(decoded);

		next();
	});
};

exports.highScore = (req, res) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({
			message: "No token provided!",
		});
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}

		User.find({}, "highscore username")
			.then((data) => {
				console.log(data);

				res.status(200).send(data);
			})
			.catch((err) => {
				res.status(500).send({ message: "Internal Error", err });
			});
	});
};
