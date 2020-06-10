const express = require('express');
const bodyParser = require('body-parser');

const expressJSDocSwagger = require('express-jsdoc-swagger');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// ROUTER
expressJSDocSwagger(app)(config.api.swaggerOptions);
app.use('/api/user', user)
app.use('/api/auth', auth);

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Listening on port', config.api.port);
});