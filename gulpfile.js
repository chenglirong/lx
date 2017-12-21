var gulp = require('gulp');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var path  = require('path');
var fs = require('fs');

gulp.task('minify',function(){
    gulp.src('./css/*.css')
        .pipe(minify())
        .pipe(gulp.dest('dest'))
})
gulp.task('uglify',function(){
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('src'))
})
gulp.task('server',function(){
    gulp.src('.')
        .pipe(server({
            host:"localhost",
            port:8080,
            open:true,
            livereload:true,
            fallback:"index.html"
        }))
})
gulp.task("dataServer", function() {
    gulp.src("./Data")
        .pipe(server({
            host: "localhost",
            port: 8090,
            middleware: function(req, res, next) {
               if (req.url == "/data/") {
                    var filepath = path.join(__dirname, "Data/data.json");
                    fs.readFile(filepath, function(err, data) {
                        if (err) return console.error(err);
                        res.writeHead(200, {
                            "Content-Type": "text/json",
                            "Access-Control-Allow-Origin": "*"
                        });
                        res.end(data);
                    });
                }
            }
        }));
});
gulp.task('default',["minify","uglify","server","dataServer"]);