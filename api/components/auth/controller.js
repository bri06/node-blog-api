const auth = require('../../../auth');
const TABLE = 'auth';
module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/fake');
    }
    return {
        upsert: (data) => {
            const authData = {
                id: data.id,
            }
            if (data.username) {
                authData.username = data.username;
            }
            if (data.password) {
                authData.password = data.password;
            }
            return store.upsert(TABLE, authData)
        },
        login: async (username, password) => {
            const data = await store.query(TABLE, { username, })
            if (data.password === password) {
                console.log(data)
                return auth.sign(data);
            } else {
                throw new Error('Invalid info');
            }
            return data;
        },
    };
};