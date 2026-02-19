const express = require("express");
const routes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use("/", routes);

app.listen(3001, () => {
    console.log("Auth Service running on 3001");
});
