const gulp = require('gulp');
const fsn = require('fs-nextra');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');
const path = require('path');
const project = ts.createProject('tsconfig.json');

async function build() {
	await Promise.all([
		fsn.emptydir('dist'),
		fsn.emptydir('typings')
	]);

	const result = project.src()
		.pipe(sourcemaps.init())
		.pipe(project());

	await fsn.copy(path.join(__dirname, 'src', 'data'), path.join(__dirname, 'dist', 'data'))
	return merge([
		result.dts.pipe(gulp.dest('typings')),
		result.js.pipe(sourcemaps.write('.', { sourceRoot: '../src' })).pipe(gulp.dest('dist'))
	]);
}

gulp.task('default', build);
gulp.task('build', build);
console.log("Hello World");

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    var responseData = JSON.parse(xhr.responseText);
    console.log(responseData);
  } else {
    console.error('Request failed with status:', xhr.status);
}
};

xhr.onerror = function() {
  console.error('Network error occurred');
};

xhr.send();