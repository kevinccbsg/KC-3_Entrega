'use strict'
const gulp 		 	= require('gulp'),
	  sass 		 	= require('gulp-sass'),
	  browserSync  	= require('browser-sync').create(),
	  browserify 	= require('browserify'),
	  tap 		 	= require('gulp-tap'),
	  buffer 		= require('gulp-buffer'),
	  babelify 	 	= require('babelify'),
	  fileinclude  	= require('gulp-file-include'),
	  uglify 		= require('gulp-uglify'),
	  sourcemaps 	= require('gulp-sourcemaps'),
	  postcss 	 	= require('gulp-postcss'),
	  autoprefixer  = require('autoprefixer'),
	  cssnano 	 	= require('cssnano'),
	  imagemin 	 	= require('gulp-imagemin'),
	  merge 		= require('merge-stream'),
	  gutil 		= require('gulp-util'),
	  source 		= require('vinyl-source-stream'),
	  htmlmin 		= require('gulp-htmlmin');;


let developPath = './src/*.html';
let includePath = './src/includes/*.html';
let fontPath = './src/fonts/**/*.{ttf,woff,woff2,eof,svg}'
let videoPath = './src/videos/**/*.mp4';
let sassPath = './src/scss/*.scss';
let jsPath = './src/js/app.js';
let assetsImg = './src/images/*.{png,jpg,jpeg,gif,svg,JPEG}';

gulp.task('include-files', function() {
	return gulp.src(developPath)
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream());
});
gulp.task('copying-fonts', function() {
	return gulp.src(fontPath)
	.pipe(gulp.dest('./dist/fonts/'));
});
gulp.task('copying-videos', function() {
	return gulp.src(videoPath)
	.pipe(gulp.dest('./dist/videos/'));
});
gulp.task('compile-sass', function() {
	return gulp.src(sassPath)
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./dist/css/'))
	.pipe(browserSync.stream());
});
gulp.task('browserify-js-files', function() {
	// set up the browserify instance on a task basis
	var b = browserify({
		entries: './src/js/app.js',
		debug: true
	})
	.transform(babelify);

	return b.bundle()
	.pipe(source('./app.js'))
	.pipe(buffer())
		// Add transformation tasks to the pipeline here.
		.pipe(uglify())
		.on('error', gutil.log)
	.pipe(gulp.dest('./dist/js/'))
	.pipe(browserSync.stream());

});
gulp.task('browserify-js-static-files', function() {
	return gulp.src(jsPath)
	.pipe(tap(function (file) {
		file.contents = browserify(file.path, {debug: true}).transform(babelify).bundle();
	}))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'))
});
gulp.task('minified-assets-images', function() {
	return gulp.src(assetsImg)
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(gulp.dest('./dist/images/'))
})

gulp.task('develop', [
	'include-files',
	'copying-fonts',
	'copying-videos',
	'compile-sass',
	'browserify-js-files',
	'minified-assets-images'], function () {
		// we work with sparest server
		browserSync.init({
			proxy: '127.0.0.1:8000'
		});
		// Define the watchers
		gulp.watch(includePath, ['include-files']);
		gulp.watch(sassPath, ['compile-sass']);
		gulp.watch('./src/js/*.js', ['browserify-js-files']);
		gulp.watch(assetsImg, ['minified-assets-images']);
		gulp.watch(spritePath, ['sprite-generator', 'compile-sass']);
		gulp.watch(developPath, ['include-files']).on('change', browserSync.reload);
	});

gulp.task('production-statics', [
	'include-files',
	'copying-fonts',
	'copying-videos',
	'compile-sass',
	'browserify-js-static-files',
	'minified-assets-images'], function () {
		console.log('Statics done');
	});