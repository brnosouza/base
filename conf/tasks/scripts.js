import named from "vinyl-named";
import {webpackConf} from "../webpack/webpack.conf";
import webpackStream from "webpack-stream";
import {dest, src} from "gulp";
import paths from "./paths";

export function scripts() {
    return src(paths.scripts.src)
        .pipe(named())
        .pipe(webpackStream(webpackConf({production: false})))
        .pipe(dest(paths.scripts.dest));
}

export function scriptsProduction() {
    return src(paths.scripts.src)
        .pipe(named())
        .pipe(webpackStream(webpackConf({production: true})))
        .pipe(dest(paths.scripts.dest));
}
