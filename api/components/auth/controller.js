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
    };
};