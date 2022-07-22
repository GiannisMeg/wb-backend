const { Router } = require("express");
const Products = require("../models").product;
const Categories = require("../models").category;
const router = new Router();

router.get("/", async (req, res, next) => {
	try {
		const allCategories = await Categories.findAll();
		res.send(allCategories);
	} catch (e) {
		next(e);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const id = parseInt(req.params.id);
		const allCategories = await Categories.findByPk(id);
		res.send(allCategories);
	} catch (e) {
		next(e);
	}

});

module.exports = router;
