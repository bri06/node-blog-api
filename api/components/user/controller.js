const store = require('../../../store/fake');

const TABLA = 'user';

const list = () => store.list(TABLA);

module.exports = {
    list,
};
