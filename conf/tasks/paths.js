export const baseSrcFolder = `src`;
export const baseDistFolder = `public`;

export const baseSrcAssetsFolder = `${baseSrcFolder}/assets`;
export const baseDistAssetsFolder = `${baseDistFolder}/assets`;

export default {
    dist: {del: baseDistFolder},
    styles: {
        src: [
            `${baseSrcAssetsFolder}/css/**/*.scss`
        ],
        dest: `${baseDistAssetsFolder}/css/`
    },
    html: {
        src: [
            `${baseSrcFolder}/**/*.nunj`,
            `!${baseSrcFolder}/common/*.nunj`
        ],
        watch: `${baseSrcFolder}/**/*.nunj`,
        dest: `${baseDistFolder}/`,
        del: `${baseDistFolder}/**/*.html`
    },
    scripts: {
        src: `${baseSrcAssetsFolder}/js/**/*.js`,
        dest: `${baseDistAssetsFolder}/js/`,
        watch: `${baseSrcAssetsFolder}/js/**/*.js`,
        injectScripts: `${baseDistAssetsFolder}/js/*.js`
    },
    fonts: {
        src: [
            `${baseSrcAssetsFolder}/assets/fonts/*`
        ],
        dest: `${baseDistAssetsFolder}/fonts/`
    },
    images: {
        src: `${baseSrcAssetsFolder}/img/**/*.{png,jpg,gif,svg}`,
        dest: `${baseDistAssetsFolder}/img/`
    }
};
