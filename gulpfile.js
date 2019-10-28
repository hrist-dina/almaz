'use strict'

const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const fileinclude = require('gulp-file-include');
const combine = require('stream-combiner2');
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');

const ENV = {
	dev: $.environments.development,
	prod: $.environments.production
}

gulp.task('html', () => {
	let combined = combine.obj([
		gulp.src('./*.html'),
		gulp.dest('../assets/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('styles', () => {
	let combined = combine.obj([
		gulp.src('./css/main.less'),
		ENV.dev($.sourcemaps.init()),
		$.less({
            relativeUrls: true
		}),
		$.autoprefixer({ cascade: false }),
		$.csscomb(),
		ENV.dev($.sourcemaps.write()),
		gulp.dest('../assets/css/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('libs', () => {
	let combined = combine.obj([
		gulp.src('./js/libs.js'),
		fileinclude('@@'),
		$.uglify(),
		gulp.dest('../assets/js/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('scripts', () => {
	let combined = combine.obj([
		gulp.src(['./js/*.js', '!./js/libs.js']),
		ENV.dev($.sourcemaps.init()),
		$.babel({
			presets: ['env'],
			plugins: ['transform-object-rest-spread']
		}),
		$.uglify(),
		ENV.dev($.sourcemaps.write()),
		gulp.dest('../assets/js/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('img', () => {
	let combined = combine.obj([
		gulp.src('./img/**/*.*'),
		$.imagemin(),
		gulp.dest('../assets/img/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('pictures', () => {
	let combined = combine.obj([
		gulp.src('./pictures/**/*.*'),
		$.imagemin(),
		gulp.dest('../assets/pictures/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('icons', function () {
	return gulp
		.src('dev/icons/**/*.svg')
		.pipe($.svgmin(function (file) {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			
			return {
				plugins: [{
					cleanupIDs: {
					prefix: 'icon-' + prefix,
					minify: true
				}
			}]
		}
	}))
	.pipe($.cheerio({
		run: function ($, file) {
			$('style').remove();
		},
		parserOptions: { xmlMode: true }
	}))
	.pipe($.svgstore())
	.pipe(gulp.dest('public/img'));
});

gulp.task('fonts', () => {
	let combined = combine.obj([
		gulp.src('./css/fonts/*.*'),
		gulp.dest('../assets/css/fonts/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('video', () => {
	let combined = combine.obj([
		gulp.src('./video/**/*.*'),
		gulp.dest('../assets/video/')
	]);

	combined.on('error', console.error.bind(console));
	return combined;
});

gulp.task('clean', (cb) => {
	rimraf('../assets', cb);
});

gulp.task('build', [
	'html',
	'styles',
	'libs',
	'scripts',
	'img',
	'pictures',
	'icons',
	'fonts',
	'video'
]);

gulp.task('watch', () => {
	$.watch(['dev/**/*.html'], () => {
		gulp.start('html');
		browserSync.reload();
	});

	$.watch(['dev/css/**/*.*'], function() {
		gulp.start('styles');
		browserSync.reload();
	});

	$.watch(['dev/js/vendor/*.*', 'dev/js/libs.js'], function() {
		gulp.start('libs');
		browserSync.reload();
	});

	$.watch(['dev/js/**/*.js', '!dev/js/libs.js'], function() {
		gulp.start('scripts');
		browserSync.reload();
	});

	$.watch(['dev/img/**/*.*'], function() {
		gulp.start('img');
		browserSync.reload();
	});

	$.watch(['dev/pictures/**/*.*'], function() {
		gulp.start('pictures');
		browserSync.reload();
	});

	$.watch(['dev/icons/**/*.*'], function() {
		gulp.start('icons');
		browserSync.reload();
	});

	$.watch(['dev/fonts/**/*.*'], function() {
		gulp.start('fonts');
		browserSync.reload();
	});

	$.watch(['dev/video/**/*.*'], function() {
		gulp.start('video');
		browserSync.reload();
	});
});

gulp.task('server', () => {
	browserSync.init({
		server: { baseDir: "../assets/" },
		port: 9000
	});
});

gulp.task('default', ['build', 'server', 'watch']);