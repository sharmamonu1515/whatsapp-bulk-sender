const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './content.js', // Adjust the path to your content.js file
    output: {
        path: path.resolve(__dirname),
        filename: 'content.bundle.js' // The output file
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
};