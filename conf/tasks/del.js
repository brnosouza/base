import del from "del";
import paths from "./paths";

export const cleanCSS = () => del(paths.styles.dest);
export const cleanJS = () => del(paths.scripts.dest);
export const cleanFonts = () => del(paths.fonts.dest);
export const cleanImages = () => del(paths.images.dest);
export const cleanHTML = () => del(paths.html.del);


export const cleanDist = () => del(paths.dist.del)