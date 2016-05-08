var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('images/sprite/*.png') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                imgPath: '../images/sprite.png',
                cssName: 'sprite.scss',
             //   cssFormat: 'scss_maps',
               // algorithm: 'top-down',
              //  cssTemplate: 'handlebarsInheritance.scss.handlebars'
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('web/images')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('scss')); // путь, куда сохраняем стили
});

gulp.task('connect', function() {
    connect.server({
        root : "web",
        livereload : true
    });
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('web/css'))
        .pipe(connect.reload());
});

gulp.task('watch',function(){
    gulp.watch('scss/**/*.scss',['sass']);
    gulp.watch('web/*.html',['html']);
});

gulp.task('html', function(){
    gulp.src('web/*.html')
        .pipe(connect.reload());
});

gulp.task('default', ['sprite','sass','connect', 'watch']);
