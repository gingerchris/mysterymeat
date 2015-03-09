//initialize all of our variables
var app, base, concat, directory, gulp, gutil, hostname, path, refresh, sass, uglify, imagemin, minifyCSS, del, connect, autoprefixer, gulpSequence, shell, rename, sketch, iconfont, consolidate;

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//load all of our dependencies
//add more here if you want to include more libraries
gulp        = require('gulp');
gutil       = require('gulp-util');
concat      = require('gulp-concat');
uglify      = require('gulp-uglify');
sass        = require('gulp-sass');
imagemin    = require('gulp-imagemin');
minifyCSS   = require('gulp-minify-css');
connect     = require('gulp-connect');
autoprefixer = require('gulp-autoprefixer');
gulpSequence = require('gulp-sequence').use(gulp);
shell       = require('gulp-shell');
rename = require("gulp-rename");
sketch = require("gulp-sketch");
iconfont = require('gulp-iconfont');
consolidate = require('gulp-consolidate');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('symbols', function(){
  var fontName = 'icons'; // set name of your symbol font
  var template = 'dowlo-style';
  gulp.src('icon-font/symbol-font-14px.sketch') // you can also choose 'symbol-font-16px.sketch'
    .pipe(sketch({
      export: 'artboards',
      formats: 'svg'
    }))
    .pipe(iconfont({ fontName: fontName }))
    .on('codepoints', function(codepoints) {
      var options = {
        glyphs: codepoints,
        fontName: fontName,
        fontPath: '../fonts/' // set path to font (from your CSS file if relative)
      };
      gulp.src('icon-font/templates/' + template + '.scss')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'_'+fontName }))
        .pipe(gulp.dest('app/styles/scss/general/')); // set path to export your CSS
        
    })
    .pipe(gulp.dest('app/fonts/')); // set path to export your fonts
});

//compressing images & handle SVG files
gulp.task('images', function(tmp) {
    console.log(tmp);
    gulp.src(['app/images/*.jpg', 'app/images/*.png'])
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }));
});

//compressing images & handle SVG files
gulp.task('images-deploy', function() {
    gulp.src(['app/images/**/*', '!app/images/README'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('hulk', function() {
    return gulp.src('app/scripts/src/templates/*')
      .pipe(shell([
        'node_modules/hogan/node_modules/hogan.js/bin/hulk app/scripts/src/templates/*.hgn > app/scripts/src/_includes/templates-compiled.js'
      ])
    );
});

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['app/scripts/src/lib/*.js', 'app/scripts/src/*.js', 'node_modules/hogan/node_modules/hogan.js/dist/hogan-3.0.2.js', 'app/scripts/src/_includes/*.js'])
                //this is the filename of the compressed version of our JS
               .pipe(concat('app.js'))
               //catch errors
               .on('error', gutil.log)
               //compress :D
               //.pipe(uglify())
               //where we will store our finalized, compressed script
               .pipe(gulp.dest('app/scripts'))
               //notify LiveReload to refresh
               .pipe(connect.reload());
});

//compiling our Javascripts for deployment
gulp.task('scripts-deploy', function() {
    //this is where our dev JS scripts are
    return gulp.src(['app/scripts/src/_includes/**/*.js', 'app/scripts/src/**/*.js'])
                //this is the filename of the compressed version of our JS
               .pipe(concat('app.js'))
               //compress :D
               .pipe(uglify())
               //where we will store our finalized, compressed script
               .pipe(gulp.dest('dist/scripts'));
});

//compiling our SCSS files
gulp.task('styles', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('app/styles/scss/*.scss')
                //include SCSS and list every "include" folder
               .pipe(sass({
                      errLogToConsole: true,
                      includePaths: [
                          'app/styles/scss/'
                      ]
               }))
               .pipe(autoprefixer({
                   browsers: autoPrefixBrowserList,
                   cascade:  true
               }))
               //catch errors
               .on('error', gutil.log)
               //where to save our final, compressed css file
               .pipe(gulp.dest('app/styles'))
               //notify LiveReload to refresh
               .pipe(connect.reload());
});

//compiling our SCSS files for deployment
gulp.task('styles-deploy', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('app/styles/scss/*.scss')
                //include SCSS includes folder
               .pipe(sass({
                      includePaths: [
                          'app/styles/scss',
                      ]
               }))
               .pipe(autoprefixer({
                   browsers: autoPrefixBrowserList,
                   cascade:  true
               }))
               .pipe(minifyCSS())
               //where to save our final, compressed css file
               .pipe(gulp.dest('dist/styles'));
});

//basically just keeping an eye on all HTML files
gulp.task('html', function() {
    //watch any and all HTML files and refresh when something changes
    return gulp.src('app/*.html')
        .pipe(connect.reload())
       //catch errors
       .on('error', gutil.log);
});

//migrating over all HTML files for deployment
gulp.task('html-deploy', function() {
    //grab everything, which should include htaccess, robots, etc
    gulp.src('app/*')
        .pipe(gulp.dest('dist'));

    //grab any hidden files too
    gulp.src('app/.*')
        .pipe(gulp.dest('dist'));

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    //grab all of the styles
    gulp.src(['app/styles/*.css', '!app/styles/styles.css'])
        .pipe(gulp.dest('dist/styles'));
});

//cleans our dist directory in case things got deleted
gulp.task('clean', function() {
    return shell.task([
      'rm -rf dist'
    ]);
});

//create folders using shell
gulp.task('scaffold', function() {
  return shell.task([
      'mkdir dist',
      'mkdir dist/fonts',
      'mkdir dist/images',
      'mkdir dist/scripts',
      'mkdir dist/styles'
    ]
  );
});

//this is our master task when you run `gulp` in CLI / Terminal
//this is the main watcher to use when in active development
//  this will:
//  startup the web server,
//  start up livereload
//  compress all scripts and SCSS files
gulp.task('default', ['connect', 'scripts', 'styles'], function() {
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('app/scripts/src/templates/*.hgn', ['hulk', 'scripts']);
    gulp.watch('app/scripts/src/*.js', ['scripts']);
    gulp.watch('app/styles/scss/**', ['styles']);
    gulp.watch('app/images/**', ['images']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('icon-font/*', ['symbols']);
});

//this is our deployment task, it will set everything for deployment-ready files
gulp.task('deploy', gulpSequence('clean', 'scaffold', ['scripts-deploy', 'styles-deploy', 'images-deploy'], 'html-deploy'));
