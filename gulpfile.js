// Import Plugins
var gulp 						= require('gulp'),
		browserSync 		= require('browser-sync').create(),
		concat 					= require('gulp-concat'),
		uglify 					= require('gulp-uglify'),
		sass 						= require('gulp-sass'),
		sourcemaps 			= require('gulp-sourcemaps'),
		autoprefixer 		= require('gulp-autoprefixer'),
		cssnano					= require('gulp-cssnano'),
		rename					= require('gulp-rename'),
		changed 				= require('gulp-changed'),
		imageResize			= require('gulp-image-resize'),
		cp          		= require('child_process');


// Jekyll
gulp.task('jekyll-build', function (done){
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
     			.on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Styles
gulp.task('styles', function() {

	gulp.src('_sass/**/*.+(scss|sass)')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./_site/assets/css/'))
		.pipe(browserSync.stream({match: '**/*.css'}))
		.pipe(gulp.dest('./assets/css/'));
});

// JavaScript
gulp.task('js', function(){

	return gulp.src(['./assets/js/lib/transition.js', './assets/js/lib/zoom.js', './assets/js/functions.js'])
		.pipe(concat('functions.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./_site/assets/js/'))
		.pipe(gulp.dest('./assets/js/'));

});


// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['js', 'styles', 'jekyll-build'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});

// Watch
gulp.task('watch', function(){

	gulp.watch('./assets/js/**/*.js', ['jekyll-rebuild']);
	gulp.watch('./_sass/**/*.+(scss|sass)', ['styles']);
	gulp.watch('./*.html', ['jekyll-rebuild']);
	gulp.watch('./_includes/**/*.html', ['jekyll-rebuild']);
	gulp.watch('./_layouts/**/*.html', ['jekyll-rebuild']);
	gulp.watch('./_pages/**/*.+(html|md|markdown)', ['jekyll-rebuild']);
	gulp.watch('./_posts/**/*.+(html|md|markdown)', ['jekyll-rebuild']);

});

gulp.task('default', ['browser-sync', 'watch']);
