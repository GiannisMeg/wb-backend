const { Router } = require("express");
const Categories = require("../models").category;

const router = new Router();

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const specificCategory = await Categories.findByPk(id);
    res.send(specificCategory);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
