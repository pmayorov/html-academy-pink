import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemap from 'gulp-sourcemaps';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import cssmin from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import webp from 'gulp-webp';
import linthtml from '@linthtml/gulp-linthtml';
import combineSelectors from 'postcss-combine-duplicated-selectors';
import mqPacker from '@hail2u/css-mqpacker';

// import strip from 'gulp-strip-comments';
// import svgstore from 'gulp-svgstore';
// import * as del from 'del';
// import { deleteSync } from 'del';
import { deleteAsync } from 'del';


// Paths

const paths = {
  html: {
    src: 'source/**/*.html',
    dest: 'build'
  },
  styles: {
    src: 'source/sass/**/*.scss',
    dest: 'build/css'
  },
  scripts: {
    src: 'source/scripts/**/*.js',
    dest: 'build/scripts'
  },
  allimages: {
    src: 'source/img/**/*.{png,jpg}',
    dest: 'build/img'
  }
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};


// Clean build
export const clean = () => {
  return deleteAsync(['build']);
};

// Delete others css on build
export const delCss = () => {
  return deleteAsync([
    'source/css/style.css',
    'source/css/style.css.map',
    'build/css/style.css',
    'build/css/style.css.map',
    'build/css/style.min.css.map'
  ]);
};

// Minify *.html
export const minhtml = () => {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest([paths.html.dest]));
};

// lintHTML
export const lintHTML = () => {
  return gulp.src(paths.html.src)
    .pipe(linthtml('./linthtmlrc.json'))
    .pipe(linthtml.format())
    .pipe(linthtml.failOnError());
}
lintHTML.description = 'Analyse all HTML files using linthtml';

// SASS to CSS
export const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css/'))
    .pipe(gulp.dest(paths.styles.dest));
};

export const csso = () => {
  return gulp.src('build/css/style.css')
    .pipe(sourcemap.init())
    .pipe(postcss([cssmin()]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(gulp.dest(paths.styles.dest));
};

// #region PostCSS Plugins

//* PostCSS Plugins - START
// https://github.com/postcss/postcss/blob/main/docs/plugins.md#optimizations

//* Combine duplicated selectors'
// https://github.com/ChristianMurphy/postcss-combine-duplicated-selectors

export const combSel = () => {
  return gulp.src('source/css/**/*.css')
    .pipe(postcss([combineSelectors()]))
    .pipe(gulp.dest('source/css/output'));
};

//* CSS Media Query Packer
// https://github.com/hail2u/node-css-mqpacker

export const cssRebase = () => {
  return gulp.src('source/css/**/*.css')
    .pipe(postcss([mqPacker()]))
    .pipe(gulp.dest('source/css/output'));
};

// #endregion

// Minify JS
export const minjs = () => {
  // выбираем все не минифицированные файлы для минификации
  // return gulp.src(paths.scripts.src)
  return gulp.src('source/scripts/!(*.min).js')
    .pipe(terser())
    // Пакетное переименование – вызываем метод rename и передаем ему функцию обратного вызова
    .pipe(rename(function (path) {
      // добавляем суффикс '-min' к базовому имени файла
      //* path.basename += '-min';
      // меняем расширение файла на .min.js
      path.extname = '.min.js';
    }
    ))
    .pipe(gulp.dest('source/scripts'))
    .pipe(gulp.dest(paths.scripts.dest));
};

// Copy images to /build
export const copyimages = () => {
  return gulp.src(paths.allimages.src)
    .pipe(gulp.dest(paths.allimages.dest));
};

// Optimize images
export const optimizeimages = () => {
  return gulp.src(paths.allimages.src)
    .pipe(squoosh())
    .pipe(gulp.dest(paths.allimages.dest));
};

// Convert images to Webp
export const createwebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest(paths.allimages.dest));
};

// Minify sprite.svg
export const minsprite = () => {
  return gulp.src('source/img/**/sprite.svg')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.allimages.dest));
};

// Minify all svg-files
export const minsvg = () => {
  return gulp.src('source/img/**/*.svg')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.allimages.dest));
};

// Make sprite file
export const makesprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    // .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.allimages.dest));
};

// Copy files to build
export const copyfiles = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2, woff}',
    'source/*.ico',
    // 'source/img/**/*.svg',
    // 'source/scripts/**/*.js',
    // 'source/**/*.html'
    //  '!source/img/icons/*.svg'
  ], { base: 'source' })
    .pipe(gulp.dest('build'));
  done();
};

// Watcher scripts and styles for DevMode
const devWatcher = () => {
  // gulp.watch(paths.styles.src, gulp.series(styles, csso, delCss));
  gulp.watch(paths.styles.src, gulp.series(styles, csso));
  gulp.watch('source/scripts/**/!(*.min).js', gulp.series(minjs));
};

// Develop mode
export const dev = gulp.series(
  styles,
  csso,
  delCss,
  minjs,
  devWatcher
);

// Build project
export const build = gulp.series(
  clean,
  copyfiles,
  gulp.parallel(
    gulp.series(styles, csso, delCss),
    minhtml,
    minjs,
    minsvg,
    optimizeimages,
    createwebp
  ),
  server
);

// Default mode (without image optimization)
export default gulp.series(
  clean,
  gulp.parallel(
    copyfiles,
    copyimages,
    gulp.series(styles, csso, delCss),
    minhtml,
    minjs,
    minsvg
  ),
  server
);
