import {dest, src} from "gulp";
import paths, {baseDistFolder} from "./paths";
import htmlMin from "gulp-html-minifier";
import inject from "gulp-inject";
import crypto from "crypto";
import nunjucks from "nunjucks";
import compilerNunjucks from "gulp-nunjucks";
import rename from "gulp-rename";

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader("./src/"));

export const html = () => {
    return src(paths.html.src)
        .pipe(compilerNunjucks.compile(null, {env}).on("error", console.log))
        .pipe(rename({extname: ".html"}))
        .pipe(inject(src(paths.scripts.injectScripts), {
            starttag: "<!-- inject:{{path}} -->",
            relative: true,
            quiet: true,
            ignorePath: `../../${baseDistFolder}`,
            transform: function () {
                arguments[0] = `../${arguments[0]}`;
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(dest(paths.html.dest));
};

export const htmlProduction = () => {
    const randomBytes = crypto.randomBytes(20).toString("hex");

    return src(paths.html.src)
        .pipe(compilerNunjucks.compile(null, {env}))
        .pipe(rename({extname: ".html"}))
        .pipe(inject(src(paths.scripts.injectScripts), {
            starttag: "<!-- inject:{{path}} -->",
            relative: true,
            quiet: true,
            ignorePath: "../../public",
            transform: function () {
                arguments[0] = `../${arguments[0]}?hash=${randomBytes}`;
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(htmlMin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            useShortDoctype: true
        }))
        .pipe(dest(paths.html.dest));
};