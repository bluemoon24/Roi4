const config = require('./config.js');

module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.output.publicPath = config.path;
        }
    }
}
