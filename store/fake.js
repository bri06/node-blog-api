const db = {
    user: [
        { id: '1', name: 'test' },
    ],
};

const list = async (tabla) => db[tabla] || [];
const get = async (tabla, id) => {
    const collection = await list(tabla);
    return collection.filter(elem => elem.id === id)[0] || null;
};
const upsert = async (tabla, data) => {
    if(!db[tabla]) {
        db[tabla] = []
    }
    db[tabla].push(data);
}
const remove = async (tabla, id) => true;

const query = async (tabla, q) => {
    const collection = await list(tabla);
    const [key] = Object.keys(q);
    return collection.filter(elem => elem[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};
