const { Router } = require("express");
const Products = require("../models").product;

const router = new Router();

router.get("/", async (req, res, next) => {
	try {
		const allProducts = await Products.findAll();
		res.send(allProducts);
	} catch (e) {
		next(e);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const id = parseInt(req.params.id);
		const allProducts = await Products.findByPk(id);
		res.send(allProducts);
	} catch (e) {
		next(e);
	}
});

module.exports = router;