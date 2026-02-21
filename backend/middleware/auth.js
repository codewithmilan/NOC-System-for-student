const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(403).json("Token required");

    // ⭐ REMOVE "Bearer "
    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, "SECRETKEY");

        req.user = verified; // { id, role }
        next();

    } catch (err) {
        res.status(401).json("Invalid Token");
    }
};

module.exports = verifyToken;