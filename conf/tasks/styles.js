import {dest, src} from "gulp";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import nodeSass from "node-sass";
import paths from "./paths";

sass.compiler = nodeSass;

export function styles() {
    return src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.styles.dest));
}

export function stylesProduction() {
    return src(paths.styles.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCSS({debug: true, level: 2}, (details) => {
            console.log(`\n-----------------------------------`);
            console.log(`${details.name}:`);
            console.log(`Original Size: ${(details.stats.originalSize / 1000).toFixed(2)}kb`);
            console.log(`Minified Size: ${(details.stats.minifiedSize / 1000).toFixed(2)}kb`);
            console.log(`Efficiency: ${(details.stats.efficiency * 100).toFixed(2)}%`);
            console.log(`-----------------------------------\n`);
        }))

        .pipe(dest(paths.styles.dest));
}

