
var gulp = require('gulp');
var minify = require('gulp-minify'); 
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var exec = require('child_process').exec

gulp.task('minify javascript', function() {
  gulp.src('src/components/**/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest('dist/components'))
});

gulp.task('minify store', function() {
  gulp.src('src/store/**/*.json')
    .pipe(minify({
        ext:{
            min:'.json'
        }
    }))
    .pipe(gulp.dest('dist/store'))
});

gulp.task('minify template tags', function() {
  return gulp.src('src/components/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('tmp'));
});
 
gulp.task('concatenate template tags', function() {
  exec('touch ./tmp/templates.concat');
  return gulp.src('./tmp/**/*.html')
    .pipe(concat('templates.concat', {newLine: ''}))
    .pipe(gulp.dest('./tmp/', {overwrite: true}));
});

//https://unix.stackexchange.com/questions/141387/sed-replace-string-with-file-contents
 gulp.task('insert template tags', function() {
  var insertion = 'sed -e \"s/<templates>/$(sed \'s:[/\\\\&]:\\\\&:g\' tmp/templates.concat)/\" src/index.html > dist/index.html';
  exec(insertion, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(insertion);
  });
});

gulp.task('watch', function(){
  gulp.watch('./src/**', ['default']);
});

gulp.task('default', ['minify javascript', 'minify store', 'minify template tags', 'concatenate template tags', 'insert template tags']);