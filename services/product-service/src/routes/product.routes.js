const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");

router.get("/products", (req, res) => {
   return res.json([
        { id: 1, name: "Laptop" },
        { id: 2, name: "Phone" }
    ]);
});

module.exports = router;
