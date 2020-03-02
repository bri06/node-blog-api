const db = {
    user: [
        { id: '1', name: 'test' },
    ],
};

const list = async (tabla) => db[tabla];
const get = async (tabla, id) => {
    const collection = await list(tabla);
    return collection.filter(elem => elem.id === id)[0] || null;
};
const upsert = async (tabla, data) => db[tabla].push(data);

const remove = async (tabla, id) => true;

module.exports = {
    list,
    get,
    upsert,
    remove,
};
