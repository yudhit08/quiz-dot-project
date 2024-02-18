const user = require("../controllers/user.controller");

module.exports = (app) => {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});
	app.post("/api/user/signup", user.create);
	app.post("/api/user/login", user.login);
	app.post("/api/user/auth", user.auth);
	app.post("/api/user/highscore", user.highScore);
	app.post("/api/user/score", user.updateScore);
};
