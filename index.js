const express = require('express');
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const verifyToken = require("./middleware/verifyToken");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

const app = express();

mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@localhost/${process.env.DATABASE_NAME}`,
    (e) => {
        if (e){
            console.log(e);
        }
        else {
            console.log("Connected to database");
        }
    }
);

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/products", verifyToken, productsRouter);

app.get("/", (req, res) => {
    res.send("⭐ Hi, welcome to Products RESTFUL API ⭐");
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
