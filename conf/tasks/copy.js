import paths from "./paths";
import {dest, parallel, src} from "gulp";

export const copyImages = () => src(paths.images.src).pipe(dest(paths.images.dest));

export const copyFonts = () => src(paths.fonts.src).pipe(dest(paths.fonts.dest));

export const copyMisc = parallel(copyImages, copyFonts);
