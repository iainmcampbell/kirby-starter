// npm install --save-dev gulp gulp-util gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-livereload tiny-lr

var gulp         = require('gulp')
var sass         = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var livereload   = require('gulp-livereload')
var sourcemaps   = require('gulp-sourcemaps')
var childProcess = require('child_process')
var connect = require('gulp-connect-php');

gulp.task('styles', function() {
 return gulp.src('assets/sass/style.sass' )
   .pipe(sourcemaps.init())
   .pipe(sass({
     style: 'expanded',
     indentedSyntax: true,
     errLogToConsole: true
   }).on('error', sass.logError))
   .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest( 'assets/css' ))
});

gulp.task('default', function() {

  connect.server({
    port: 8000
  })

  livereload.listen();

  gulp.watch('assets/sass/**/*.sass', ['styles']);
  gulp.watch([
    'assets/css/*.css',
    'assets/js/**/*',
    'assets/**/*.html',
    'site/templates/**/*.php',
    'site/snippets/**/*.php',
    'site/blueprints/**/*.php',
  ], livereload.changed);

});


// // clean up our exec process
// process.on('SIGINT', function(){
//   phpServer.kill()
//   process.exit()
// });