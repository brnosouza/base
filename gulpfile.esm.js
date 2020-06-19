import {parallel, series} from "gulp";
import {cleanDist} from "./conf/tasks/del";
import {html, htmlProduction} from "./conf/tasks/html";
import {styles, stylesProduction} from "./conf/tasks/styles";
import {copyMisc} from "./conf/tasks/copy";
import {devServer, watchAll} from "./conf/tasks/watch";
import {scripts, scriptsProduction} from "./conf/tasks/scripts";

export const production = series(
    cleanDist,
    parallel(
        stylesProduction,
        scriptsProduction,
        copyMisc
    ),
    htmlProduction
);

export default series(
    cleanDist,
    parallel(
        styles,
        scripts,
        copyMisc
    ),
    html,
    devServer,
    watchAll
);

