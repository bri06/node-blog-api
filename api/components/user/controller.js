const nanoid = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/fake');
    }
    return {
        list: () => store.list(TABLE),
        get: (id) => store.get(TABLE, id),
        upsert: async (body) => {
            let user = {
                name: body.name,
                username: body.username,
            }
            if (body.id) {
                user.id = body.id;
            } else {
                user.id = nanoid();
            }

            if (body.password || body.username) {
                await auth.upsert({
                    id: user.id,
                    username: user.username,
                    password: body.password,
                });
            }
            return store.upsert(TABLE, user)
        },
        delete: (id) => store.remove(TABLE, id),
    };
};
