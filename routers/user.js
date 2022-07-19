const { Router } = require("express");
// const Users = require("../models").user;

const router = new Router();

router.get("/", async (req, res, next) => {
	try {
	} catch (e) {
		next(e);
	}
});

module.exports = router;
