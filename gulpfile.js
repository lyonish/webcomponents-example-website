
const gulp = require('gulp');
const minify = require('gulp-minify'); 
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const exec = require('child_process').exec;
const runSequence = require('run-sequence'); // to run synchronously

// const NODE_ENV = process.env.NODE_ENV || 'dev';

gulp.task('dest javascript', function() {
  gulp.src('src/components/**/*.js')
    .pipe(gulp.dest('dist/components'))
});

gulp.task('minify javascript', function() {
  gulp.src('src/components/**/*.js')
    .pipe(minify({
      ext:{
            src:'-debug.js',
            min:'.js'
      },
      noSource: true
     })
    )
    .pipe(gulp.dest('dist/components'))
});

gulp.task('minify store', function() {
  gulp.src('src/store/**/*.json')
    .pipe(minify({
      ext:{
        src:'-debug.js',
        min:'.js'
      },
      noSource: true
    })
  )
  .pipe(gulp.dest('dist/store'))
});

gulp.task('minify template tags', function() {
  return gulp.src('src/components/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true}))
    .pipe(gulp.dest('tmp'));
});
 
gulp.task('concatenate template tags', function() {
  return gulp.src('./tmp/**/*.html')
    .pipe(concat('templates.concat', {newLine: ''}))
    .pipe(gulp.dest('./tmp/', {overwrite: true}));
});

//https://unix.stackexchange.com/questions/141387/sed-replace-string-with-file-contents
 gulp.task('insert template tags', function() {
  const insertion = 'sed -e \"s/<templates>/$(sed \'s:[/\\\\&]:\\\\&:g\' tmp/templates.concat)/\" src/index.html > dist/index.html';
  exec(insertion, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(insertion);
  });
});

gulp.task('watch', function(){
  gulp.watch('./src/**', ['default']);
});

gulp.task('default', function(){
  runSequence(
    ['dest javascript', 'minify store'],
    'minify template tags',
    'concatenate template tags',
    'insert template tags'
  );
});

gulp.task('bulid', function(){
  runSequence(
    ['minify javascript', 'minify store'],
    'minify template tags',
    'concatenate template tags',
    'insert template tags'
  );
});