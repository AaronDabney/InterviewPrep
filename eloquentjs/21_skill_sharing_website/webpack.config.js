const path = require('path');
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = 'style-loader';
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    cache: false,
    target: "node",
    entry: {
        server: path.resolve(__dirname, 'src/server.ts'),
        './public/client': './src/public/client.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "src",
                    globOptions: {
                        ignore: ["**/tsconfig.*", "**/*.ts", "**/*.js"],
                    }
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
        fallback: {
            'fs': false,
            "path": false,
            "url": false,
            "util": false,
            "stream": false,
            "crypto": false,
            "zlib": false
            // 'stream': false
        }
        
    },
};


module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }

    return config;
};
