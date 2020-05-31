const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'pub'),
    },
    node: {
        fs: "empty",
        child_process: "empty",
    }
};