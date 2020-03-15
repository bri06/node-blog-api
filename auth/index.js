const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

const sign = (data) => jwt.sign(data, secret);

const getToken = (auth) => {
    if (!auth) throw new Error('NOT TOKEN');
    if (auth.indexOf('Bearer ') === -1) throw new Error('Invalid format')
    const token = auth.replace('Bearer ', '');
    return token;
}

const verify = (token) => jwt.verify(token, secret)

const decodeHeader = (req) => {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);
        if (decoded.id !== owner) {
            throw new Error('You don\'t have permissions');
        }
    },
}

module.exports = {
    sign,
    check,
}
