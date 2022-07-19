const { toData } = require("./jwt");

function authMiddleware(req, res, next) {
	const tokenBearer = req.headers.authorization;
	if (!tokenBearer) {
		res.status(400).send("Token is not in the headers");
		return;
	}
	const token = tokenBearer.split(" ")[1];
	try {
		const authData = toData(token);
		req.userId = authData.userId;
		next();
	} catch (error) {
		res.status(400).send("Invalid Token");
		return;
	}
}

module.exports = authMiddleware;
