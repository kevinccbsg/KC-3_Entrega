'use strict'
const gulp 		 	= require('gulp'),
	  sass 		 	= require('gulp-sass'),
	  browserSync  	= require('browser-sync').create(),
	  browserify 	= require('browserify'),
	  tap 		 	= require('gulp-tap'),
	  buffer 		= require('gulp-buffer'),
	  fileinclude  	= require('gulp-file-include'),
	  uglify 		= require('gulp-uglify'),
	  sourcemaps 	= require('gulp-sourcemaps'),
	  postcss 	 	= require('gulp-postcss'),
	  autoprefixer  = require('autoprefixer'),
	  cssnano 	 	= require('cssnano'),
	  imagemin 	 	= require('gulp-imagemin'),
	  spritesmith	= require('gulp.spritesmith'),
	  merge 		= require('merge-stream'),
	  gutil 		= require('gulp-util'),
	  source 		= require('vinyl-source-stream');


let developPath = './src/*.html';
let includePath = './src/includes/*.html';
let fontPath = './src/fonts/**/*.{ttf,woff,woff2,eof,svg}'
let sassPath = './src/scss/*.scss';
let jsPath = './src/js/app.js';
let uploadsImg = ['./dist/uploads/*.png','./dist/uploads/*.jpg','./dist/uploads/*.jpeg','./dist/uploads/*.svg','./dist/uploads/*.gif'];
let assetsImg = ['./src/images/*.png','./src/images/*.jpg','./src/images/*.jpeg','./src/images/*.svg','./src/images/*.gif'];
let spritePath = './src/images/icons/**/*.png';

gulp.task('include-files', function() {
	return gulp.src(developPath)
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(browserSync.stream());
});
gulp.task('copying-fonts', function() {
	return gulp.src(fontPath)
	.pipe(gulp.dest('./dist/fonts/'));
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
	});

	return b.bundle()
	.pipe(source('./app.js'))
	.pipe(buffer())
		// Add transformation tasks to the pipeline here.
		//.pipe(uglify())
		.on('error', gutil.log)
	.pipe(gulp.dest('./dist/js/'))
	.pipe(browserSync.stream());

});
gulp.task('browserify-js-static-files', function() {
	return gulp.src(jsPath)
	.pipe(tap(function (file) {
		file.contents = browserify(file.path, {debug: true}).bundle();
	}))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'))
});
gulp.task('minified-uploaded-images', function () {
	return gulp.src(uploadsImg)
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/uploads/'))
});
gulp.task('minified-assets-images', function() {
	return gulp.src(assetsImg)
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/images/'))
})
gulp.task('sprite-generator', function () {
	let spriteData = gulp.src(spritePath)
	.pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: '_sprite.scss'
	}));
	let imgStream = spriteData.img.pipe(buffer())
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/images/icons'));

	let scssStream = spriteData.css
	.pipe(gulp.dest('./src/scss/lib'));

	return merge(imgStream, scssStream);
});

gulp.task('develop', [
	'include-files',
	'copying-fonts',
	'compile-sass',
	'browserify-js-files',
	'sprite-generator',
	'minified-assets-images',
	'minified-uploaded-images'], function () {
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
	'compile-sass',
	'browserify-js-static-files',
	'sprite-generator',
	'minified-assets-images',
	'minified-uploaded-images'], function () {
		console.log('Statics done');
	});