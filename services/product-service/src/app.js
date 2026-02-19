const express = require("express");
const routes = require("./routes/product.routes");

const app = express();
app.use(express.json());
app.use("/", routes);

app.listen(3002, () => {
    console.log("Product Service running on port 3002");
});
