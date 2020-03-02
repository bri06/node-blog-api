const nanoid = require('nanoid');

const TABLE = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/fake');
    }
    return {
        list: () => store.list(TABLE),
        get: (id) => store.get(TABLE, id),
        upsert: (body) => {
            let user = { name: body.name }
            if (body.id) {
                user.id = body.id;
            } else {
                user.id = nanoid();
            }
            return store.upsert(TABLE, user)
        },
        delete: (id) => store.remove(TABLE, id),
    };
};
