const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
// const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
// const preproc = require('gulp-less');
const preproc = require('gulp-sass');


const config = {
    src: './src',
    css: {
        watch: '/scss/**/*.scss',
        src: '/scss/blocks/main.scss',
        dest: '/css'
    },
    html: {
        src: '/index.html'
    }
};

gulp.task('build', function () {
    gulp.src(config.src + config.css.src)
            .pipe(sourcemaps.init())
            .pipe(preproc().on('error', preproc.logError))
            .pipe(gcmq())
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))
            .pipe(cleanCSS({
                level: 2
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.src + config.css.dest));
            // .pipe(browserSync.reload({
            //     stream: true
            // }));
});

gulp.task('watch',  function () {
    gulp.watch(config.src + config.css.watch, ['build']);
    // gulp.watch(config.src + config.html.src, browserSync.reload);
});

// gulp.task('browserSync', function () {
//     browserSync.init({
//         server: {
//             baseDir: config.src
//         }
//     });
// });