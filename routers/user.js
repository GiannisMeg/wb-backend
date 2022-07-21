const { Router } = require('express');
const user = require('../models').user;
const router = new Router();
const { toJWT } = require('../auth/jwt');
const bcrypt = require('bcrypt');



// Creating new character and checking if house with given ID exists
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!name || !email || !password) {
    res.status(404).send("Need a name, email and password");
    return;
  }
  
  if (password.length < 6) {
    res.status(404).send("Password must be atleast 6 characters")
    return;
  }
  
  try{
    const userCreated = await user.create({
      email,
      password: bcrypt.hashSync(password, 10),
      name,
    });
    res.json(userCreated);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Email/password incorrect 1");
  } else {
    try {
      const logUser = await user.findOne({
        where: {
          email: email,
        },
      });
      
      if (!logUser) {
        res.status(400).send("Email/password incorrect 2");
      } else if (bcrypt.compareSync(password, logUser.password)) {
        const jwt = toJWT({ userId: logUser.id });
        res.send({jwt, logUser});
      } else {
        res.status(400).send("Email/password incorrect 3");
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }
});

module.exports = router;