const jwt = require("jsonwebtoken");

const secret = process.env.secret || "f98howfe^@&#oirvhvlk$%&!#%dhv";

function toJWT(data) {
	const newToken = jwt.sign(data, secret, { expiresIn: "2h" });
	return newToken;
}

function toData(token) {
	const storedData = jwt.verify(token, secret);
	return storedData;
}

module.exports = { toJWT, toData };
