const db = {
    user: [
        { id: 1, name: 'test' },
    ],
};

const list = (tabla) => db[tabla];
const get = (tabla, id) => {
    const collection = list(tabla);
    return collection.filter(elem => elem.id === id)[0] || null;
};
const upsert = (tabla, data) => db[tabla].push(data);

const remove = (tabla, id) => true;

module.exports = {
    list,
    get,
    upsert,
    remove,
};
