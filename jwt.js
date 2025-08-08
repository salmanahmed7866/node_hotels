const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {


    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token not Found' });


    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'UnAuthorized' });
    console.log("Token :", token)
    try {
        const decoded = jwt.verify(token, process.env.secret_key)

        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ error: 'invalid token' })
    }

}

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.secret_key)
}

module.exports = { jwtAuthMiddleware, generateToken }