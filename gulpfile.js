
const gulp = require('gulp');
const minify = require('gulp-minify'); 
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const exec = require('child_process').exec;
const runSequence = require('run-sequence'); // to run synchronously
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

// const NODE_ENV = process.env.NODE_ENV || 'dev';

gulp.task('dest javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(gulp.dest('dist'))
});

gulp.task('minify javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(minify({
      ext:{
            src:'-debug.js',
            min:'.js'
      },
      noSource: true
     })
    )
    .pipe(gulp.dest('dist'))
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
  return gulp.src(['src/components/**/*.html', 'src/views/**/*.html'])
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

gulp.task('assets', function(){
  return gulp.src('src/assets/**')
  .pipe(gulp.dest('dist/assets'));
});

gulp.task('server', function(){
  nodemon({
    script: 'server.js',
    watch: 'server.js',
    env: {'NODE_ENV': 'development'}
  });
});

gulp.task('browser-sync', function() {
  browserSync.init({
      // server: {
      //     baseDir: "./dist/"
      // }
      proxy: "localhost:3013"
  });
});

gulp.task('default', function(){
  runSequence(
    ['dest javascript', 'minify store', 'assets'],
    'minify template tags',
    'concatenate template tags',
    'insert template tags'
  );
});

gulp.task('dev', function(){
  // start server and init browsersync
  runSequence(
    'server',
    'browser-sync'
  );
  //then, start watching with live reload
  gulp.watch('./src/**', function(){
    console.log('Changes detected, Browser-Sync-ing..... hut two three four^v^');
    runSequence(
      'default'
    );
    browserSync.reload();
  });
});

// prod build with minifying js
gulp.task('bulid', function(){
  runSequence(
    ['minify javascript', 'minify store', 'assets'],
    'minify template tags',
    'concatenate template tags',
    'insert template tags'
  );
});