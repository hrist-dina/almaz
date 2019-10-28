"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const less = require("gulp-less");
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

const baseDir = "./src/";
const assetsDir = "../assets/";

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: baseDir
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function clean() {
    return del(
        [assetsDir],
        {force: true}
    );
}

// Optimize Images
function images() {
    return gulp
        .src(baseDir + "img/**/*")
        .pipe(newer(assetsDir + "img"))
        .pipe(
            imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(gulp.dest(assetsDir + "img"));
}


// CSS task
function css() {
    return gulp
        .src(baseDir + "css/main.less")
        .pipe(plumber())
        .pipe(less({outputStyle: "expanded"}))
        .pipe(gulp.dest(assetsDir + "css/"))
        .pipe(rename({suffix: ".min"}))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(assetsDir + "css/"))
        .pipe(browsersync.stream());
}

function fonts() {
    return gulp
        .src(baseDir + "css/fonts/*{ttf,woff,woff2,svg,eot,otf}")
        .pipe(gulp.dest(assetsDir + "css/fonts/"));
}

// Lint scripts
function scriptsLint() {
    return gulp
        .src([baseDir + "js/**/*", "./gulpfile.js"])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
    return (
        gulp
            .src([baseDir + "js/**/*"])
            .pipe(plumber())
            .pipe(webpackstream(webpackconfig, webpack))
            // folder only, filename is specified in webpack config
            .pipe(gulp.dest(assetsDir + "js/"))
            .pipe(browsersync.stream())
    );
}

// Watch files
function watchFiles() {
    gulp.watch(baseDir + "less/**/*", css);
    gulp.watch(baseDir + "js/**/*", gulp.series(scripts));
    gulp.watch(
        [
            baseDir + "pages/**"
        ],
        gulp.series(browserSyncReload)
    );
    gulp.watch(baseDir + "img/**/*", images);
}

// define complex tasks
const js = gulp.series(scripts);
const build = gulp.series(clean, gulp.parallel(css, images, fonts, js));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.images = images;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = build;
