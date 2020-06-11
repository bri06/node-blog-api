module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
        swaggerOptions: {
            info: {
              version: '1.0.0',
              title: 'Api of blogs with node',
              license: {
                name: 'MIT',
              },
            },
            filesPattern: './**/network.js',
            baseDir: __dirname,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    }
};