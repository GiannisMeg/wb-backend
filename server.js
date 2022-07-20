const cors = require("cors");
const express = require("express");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const userRouter = require("./routers/user");

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
