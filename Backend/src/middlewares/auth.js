const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ message: "no token provided", error: "token.invalid" });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).json({ message: "Token error", error: "token.invalid" });

    const [, token] = parts;

    // if (!/^Bearer $^/i.test(scheme))
    //     return res.status(401).json({ message: "Token badly formatted" });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        console.log(err)
        if (err) return res.status(401).json({ message: "Token invalid", error: "token.expired" });

        req.userId = decoded.id;
        return next();
    })
}