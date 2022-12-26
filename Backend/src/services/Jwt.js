const jwt = require("jsonwebtoken")
const authConfig = require('../config/auth.json');

module.exports = {
    generateToken(params) {
        // console.log(params);
        return jwt.sign(params, authConfig.secret, {
            expiresIn: (86400 * 7),
        })

    },
}