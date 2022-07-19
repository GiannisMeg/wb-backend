const cors = require("cors");
const express = require("express");
const productRouter = require("./routers/product");

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors());

app.use("/products", productRouter);

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
