import template from "lodash/template";
import {BannerPlugin, DefinePlugin, NoEmitOnErrorsPlugin} from "webpack";
import pkg from "../../package.json";
import babelOptions from "./babelrc";


const banner = "/*!\n" +
    " * <%= pkg.banner_name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n" +
    " * Copyright <%= year %> <%= pkg.author %>\n" +
    " * Licensed under the MIT\n" +
    " */\n";


export const webpackConf = ({production}) => {
    const babelConfig = {
        "presets": babelOptions.presets,
        "plugins": production ? babelOptions.env.production.plugins : babelOptions.env.development.plugins
    };

    const plugins = [];
    plugins.push(
        new NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            __PRODUCTION__: production,
            "process.env": {
                "NODE_ENV": JSON.stringify(production ? "production" : "development")
            }
        })
    );

    if (production) {
        plugins.push(
            new BannerPlugin({
                banner: template(banner)({year: new Date().getFullYear(), pkg}),
                entryOnly: true,
                raw: true
            })
        );
    }

    return {
        ...(production ? {} : {devtool: "#cheap-module-source-map"}),
        mode: production ? "production" : "development",
        stats: "none",
        plugins,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        ...babelConfig
                    }
                },
                {
                    test: /\.json$/,
                    exclude: /(node_modules|vendors)/,
                    loader: "json-loader"
                }
            ]
        }
    };
};