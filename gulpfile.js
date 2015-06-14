var sources, destinations, lr, gulp, gutil, jade, stylus;

gulp = require('gulp');
jade = require('gulp-jade');
gutil = require('gulp-util');

var sources = {
  jade: "jade/**/*.jade",
  js: "scripts/**/*.js",
  css: "style/**/*.css",
};

var destinations = {
  html: "public/",
  js: "public/scripts",
  css: "public/style"
};

gulp.task("jade", function(event) {
  return gulp.src(sources.jade).pipe(jade({
    pretty: true
  })).pipe(gulp.dest(destinations.html));
});

gulp.task("js", function(event) {
  return gulp.src(sources.js)
    .pipe(gulp.dest(destinations.js));
});

gulp.task("css", function(event) {
  return gulp.src(sources.css)
    .pipe(gulp.dest(destinations.css));
});

gulp.task("watch", function() {
  gulp.watch(sources.jade, ["jade"]);
  gulp.watch(sources.js, ["js"]);
  gulp.watch(sources.css, ["css"]);
  gulp.watch('public/**/*', refresh);
});

gulp.task('serve', function () {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname+'/public/'));
  app.listen(4000);
  lr = require('tiny-lr')();
  lr.listen(35729);
});

gulp.task("default", ["jade", "js", "watch", "serve"]);

refresh = function(event) {
  var fileName = require('path').relative(__dirname, event.path);
  gutil.log.apply(gutil, [gutil.colors.magenta(fileName), gutil.colors.cyan('built')]);
  lr.changed({
    body: { files: [fileName] }
  });
}