const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const rigger = require('gulp-rigger');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
concat = require('gulp-concat');

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    libs: 'build/js/libs',
    css: 'build/css/',
    img: 'build/images/',
    fonts: 'build/fonts/',
    php:'build/',
  },
  src: { // Where to get src files
    html: 'src/*.html',
    js: 'src/js/*.js',
    libs:  'src/js/libs/*.js',
    style: 'src/scss/*.scss',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*',
    php:'src/*.php',
    sprite:'src/images/sprite.svg',
  },
  watch: {
    html: 'src/*.html',
    part:'src/partials/*.html' ,
    sprite:'src/images/sprite.svg',
    js: 'src/js/*.js',
    libs:  'src/js/libs/*.js',
    style: 'src/sass/*.scss',
    img: 'src/images/*.*',
  },
  clean: './build'
};

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    tunnel: false,
    host: 'localhost',
    port: 3003,
    logPrefix: "Happy hacking!"
  });

  gulp.watch(['src/*.html', 'src/**/*.html'], gulp.series('html:build'));
  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], gulp.series('style:build'));
  gulp.watch(['src/js/*.js'], gulp.series('script:build'));
  gulp.watch(['src/images/*'], gulp.series('images:build'));
});


gulp.task('html:build', () => {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
})

gulp.task('script:build', () => {
  return gulp.src([path.src.js])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
});

gulp.task('libs:build', () => {
  return gulp.src([path.src.libs])
    .pipe(gulp.dest(path.build.libs))
    .pipe(browserSync.stream());
})

gulp.task('style:build', () => {
  return gulp.src(path.src.style)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: ['> 0%'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
});

gulp.task('fonts:build', () => {
  return gulp.src(path.src.fonts, {encoding: false})
    .pipe(gulp.dest(path.build.fonts));
})

gulp.task('images:build', () => {
  return gulp.src(path.src.img, {encoding: false})
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());
})

gulp.task('build', gulp.series(
  'html:build',
  'style:build',
  'script:build',
  'libs:build',
  'fonts:build',
  'images:build',
));


gulp.task('default', gulp.series(
  'build',
  'serve',
));