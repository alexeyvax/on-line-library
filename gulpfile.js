const gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	less = require('gulp-less'),
	path = require('path');

// Компиляция и сборка less
gulp.task('styles', () => {
	gulp.src('styles/**/*.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')],
		}))
		.pipe(concatCss('style.css'))
		// .pipe(gulp.dest('public/'))
		// .pipe(cleanCSS({debug: true}, details => {
		// 	console.log(details.name + ': ' + details.stats.originalSize);
		// 	console.log(details.name + ': ' + details.stats.minifiedSize);
		// }))
		// .pipe(rename('style.min.css'))
		.pipe(gulp.dest('public/'));
		// .pipe(notify('Styles is ready!'));
});

gulp.task('watch', () => {
	gulp.watch('styles/**/*.less', ['styles']);
});

gulp.task('default', ['watch', 'styles']);
