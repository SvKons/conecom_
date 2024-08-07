import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';
import concat from 'gulp-concat';
import replace from 'gulp-replace';

export function styles() {
    return gulp
        .src(['styles/reset.css', 'styles/styles.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions', 'not dead'], cascade: false }))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'));
}

export function scripts() {
    return gulp
        .src('scripts/scripts.js', { sourcemaps: true })
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js', { sourcemaps: '.' }));
}

export function images() {
    return gulp.src('images/**/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
}

export function html() {
    return gulp
        .src('index.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(replace(/images\//g, 'images/'))
        .pipe(gulp.dest('dist'));
}

export function watch() {
    gulp.watch('styles/**/*', styles);
    gulp.watch('scripts/scripts.js', scripts);
    gulp.watch('images/**/*', images);
    gulp.watch('index.html', html);
}

export default gulp.series(styles, scripts, images, html, watch);
