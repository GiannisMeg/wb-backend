const { Router } = require("express");
const Products = require("../models").product;
const { Op } = require("sequelize");

const router = new Router();

router.get("/", async (req, res, next) => {
	try {
		const allProducts = await Products.findAll();
		res.send(allProducts);
	} catch (e) {
		next(e);
	}
});

//----- BACKEND Filtering ----- //
// RULE with GET request you cant extract properties from the body thats why we use params
// Obj: get price of products
// Obj: we don't go for a specific one we need all of them so we go directly to use params
// price = maxPrice?
// we filtering by using the OP
// we filtering all the products  findAll and inside and in constrains we filter with WHERE and using the operators
// /products/price/150

// router.get("/price/:price", async (req, res, next) => {
// 	try {
// 		const filterPrice = parseInt(req.params.price);

// 		const products = await Products.findAll({
// 			// check the syntax
// 			where: {
// 				price: {
// 					[Op.lte]: filterPrice,
// 				},
// 			},
// 		});
// 		res.send(products);
// 	} catch (err) {
// 		next(err);
// 	}
// });
// /products?min_price=0&max_price=5000
router.get("/price/:minPrice/:maxPrice", async (req, res, next) => {
	try {
		const minPrice = parseInt(req.params.minPrice);
		const maxPrice = parseInt(req.params.maxPrice);

		console.log("query params?", req.query);

		// !! ideally what we want to send in the frontEnd => [[0, 150], [300, 450]]

		// !! what we actually send [{},{},{}] and on that way we have to filter everything in front end

		// range=0&range=150&range=300&range=450
		// range = [0, 150, 300, 450]

		const products = await Products.findAll({
			// check the syntax
			where: {
				price: {
					[Op.between]: [minPrice, maxPrice],
				},
			},
		});

		res.send(products);
	} catch (err) {
		next(err);
	}
});

// const ranges = [
// 	[0, 150],
// 	[300, 450],
// ];

// const results = ranges.map(range => {
// 	return await Products.findAll({
// 	// check the syntax
// 	where: {
// 		price: {
// 			[Op.between]: range,
// 		},
// 	},
// });
// })

//-------- HELP NOTES --------//
// url customization instead to get everything with axios
//_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

//!!! range=0&range=150&range=300&range=450 --> when you have to run this code in httpie you need to replace the & sign with == thats the differ.

/// !!!! _.groupBy We use this one whenever we want to group by length
//_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }

// The `_.property` iteratee shorthand.
//_.groupBy(["one", "two", "three"], "length");
// => { '3': ['one', 'two'], '5': ['three'] }
module.exports = router;
