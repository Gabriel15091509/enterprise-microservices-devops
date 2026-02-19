const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use("/auth", createProxyMiddleware({
    target: "http://auth-service",
    changeOrigin: true,
    pathRewrite: { "^/auth": "" }
}));

app.use("/products", createProxyMiddleware({
    target: "http://product-service",
    changeOrigin: true,
    pathRewrite: { "^/products": "" }
}));

app.listen(3000, () => {
    console.log("Gateway running on port 3000");
});
