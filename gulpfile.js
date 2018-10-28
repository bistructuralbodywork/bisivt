var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('docs/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('docs/css'))
});