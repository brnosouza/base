import {parallel, series, watch} from "gulp";
import {styles} from "./styles";
import {html} from "./html";
import {scripts} from "./scripts";
import paths, {baseDistFolder} from "./paths";
import {copyImages} from "./copy";
import browserSync from "browser-sync";

const server = browserSync.create();

const reload = (done) => {
    server.reload();
    done();
};

export function devServer(done) {
    server.init({
        port: 3000,
        server: {
            baseDir: `./${baseDistFolder}`
        }
    });
    done();
}

export const watchStyles = () => watch(paths.styles.src, series(styles, reload));
export const watchHtml = () => watch(paths.html.watch, series(html, reload));
export const watchScripts = () => watch(paths.scripts.watch, series(scripts, reload));
export const watchImages = () => watch(paths.images.src, series(copyImages));

export const watchAll = parallel(watchStyles, watchHtml, watchScripts, watchImages);