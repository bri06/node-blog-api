const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';
module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/fake');
    }
    return {
        upsert: async (data) => {
            const authData = {
                id: data.id,
            }
            if (data.username) {
                authData.username = data.username;
            }
            if (data.password) {
                authData.password = await bcrypt.hash(data.password, 6);
            }
            return store.upsert(TABLE, authData)
        },
        login: async (username, password) => {
            const data = await store.query(TABLE, { username, })

            return bcrypt.compare(password, data.password)
                .then(equals => {
                    if (equals) return auth.sign({ username: data.username });
                    else throw new Error('Invalid info');
                });
        },
    };
};