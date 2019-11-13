// 获取 gulp
var gulp = require('gulp');
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var stripDebug = require('gulp-strip-debug');

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', function() {
    // 1\. 找到文件
    gulp.src('public/analytics.js')
        .pipe(stripDebug())
        .pipe(babel({
            presets: ['@babel/env']
        }))
    // 2\. 压缩文件
        .pipe(uglify())
    // 3\. 另存压缩后的文件
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('assets/js'));
});