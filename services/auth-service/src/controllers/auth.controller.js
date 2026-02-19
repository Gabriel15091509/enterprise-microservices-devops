const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/jwt.config");

exports.login = (req, res) => {
    const token = jwt.sign(
        { user: "lova", role: "admin" },
        SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
};
