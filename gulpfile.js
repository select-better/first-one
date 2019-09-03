const gulp=require('gulp');
const html=require('gulp-minify-html');
const css=require('gulp-minify-css');
const uglifyjs=require('gulp-uglify');
const watch=require('gulp-watch');

const sass = require('gulp-sass');
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块

const imagemin=require('gulp-imagemin');//图片的压缩
const babel = require('gulp-babel'); //es6转es5主要模块
//html 压缩
gulp.task('uglifyhtml',function(){
	return gulp.src('src/html/*.html').pipe(html()).pipe(gulp.dest('dist/html/'));
})

//css 压缩
gulp.task('uglifycss',function(){
	return gulp.src('src/css/*.css').pipe(css()).pipe(gulp.dest('dist/css/'));
})

//js 压缩
gulp.task('uglifyjs',function(){
	return gulp.src('src/js/*.js').pipe(uglifyjs()).pipe(gulp.dest('dist/js/'));
})
 
//转码，压缩的合并实现
gulp.task('babel', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js/'));
});

//5.sass编译成css
gulp.task('runsass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })) //执行编译,compressed:压缩一行
        .pipe(gulp.dest('dist/css-1/'));
});

//6.png图片的压缩
//图片压缩的插件：gulp-imagemin
gulp.task('runimg', function () {
    return gulp.src('src/imgs/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs/'));
});


//监察机构
gulp.task('default',function(){
	watch(['src/*.html','src/css/*.css','src/js/*.js','src/scss/*.scss'],gulp.parallel('uglifyhtml','uglifycss','babel','runsass'))
})

