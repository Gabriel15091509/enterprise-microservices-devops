const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "supersecret";

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET, (err) => {
        if (err) return res.sendStatus(403);
        next();
    });
};
