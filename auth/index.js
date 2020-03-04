const jwt = require('jsonwebtoken');

const sign = (data) => jwt.sign(data, 'secret');

module.exports = {
    sign,
}
