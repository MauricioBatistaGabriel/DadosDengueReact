const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "util": require.resolve("util/"),
            "zlib": require.resolve("browserify-zlib"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert/")
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    }
};
