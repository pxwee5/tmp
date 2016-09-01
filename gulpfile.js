var gulp = require('gulp');
var hb = require('gulp-hb');
var path = require('path');
var rename = require('gulp-rename');
var through = require('through2');

function posts() {
    return gulp
        .src('./src/data/*.json')
        .pipe(through.obj(function (file, enc, cb) {
            var name = path.parse(file.path).name;
            var data = JSON.parse(String(file.contents));

            gulp
                .src('./src/templates/*.hbs')
                .pipe(hb().data(data))
                .pipe(rename({
                    basename: name,
                    extname: '.html',
                }))
                .pipe(gulp.dest('./dist'))
                .on('error', cb)
                .on('end', cb);
        }));
}

gulp.task('default', posts);
