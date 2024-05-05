var gulp = require('gulp');
var cssimport = require('gulp-cssimport');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')(require('sass'));
var rev = require('gulp-rev');
var revDel = require('rev-del');
var revOriginDel = require('gulp-rev-delete-original');
var sourcemaps = require('gulp-sourcemaps');

function gulpSass() {
    return gulp
        .src(['app/scss/*.scss'])
        .pipe(cssimport({filter: /^..\/node_modules\//gi}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('../public/css'));
}
gulp.task(gulpSass);

function gulpScripts() {
    return gulp 
        .src(['app/js/*.js', 'node_modules/popper.js/dist/popper.js'])
        //.pipe(concat({path: 'scripts.js'}))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('../public/js'));
}
gulp.task(gulpScripts);

function gulpFonts() {
    return gulp
        .src(['node_modules/bootstrap-icons/font/fonts/bootstrap-icons.*'])
        .pipe(gulp.dest('../public/fonts'));
}
gulp.task(gulpFonts);

function gulpRevision() {
    return gulp 
        .src(['../public/css/styles.css', '../public/js/scripts.js'], {base: '../public', allowEmpty: true})
        .pipe(rev())
        .pipe(revOriginDel())
        .pipe(gulp.dest('../public'))
        .pipe(rev.manifest())
        .pipe(revDel({
            oldManifest: 'rev-manifest.json',
            dest: '../public',
            force: true
        }))
        .pipe(gulp.dest('./'));
}
gulp.task(gulpRevision);

function gulpWatch() {
    gulp.watch(['sass/*.scss', 'js/*.js'], gulp.series([gulpSass, gulpScripts, gulpRevision]));
}
gulp.task(gulpWatch);

gulp.task('default', gulp.series(gulpSass, gulpScripts, gulpFonts, gulpRevision));
