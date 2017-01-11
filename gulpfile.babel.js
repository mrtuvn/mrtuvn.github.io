import path from 'path';
import del from 'del';
import {argv as args} from 'yargs';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import fs from 'fs';
import semver from 'semver';

const $tsk = gulpLoadPlugins({lazy: true});
const config = require('./config').config;
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const PATH = {
	app: {
		root: path.join(__dirname, 'app'),
		img: path.join(__dirname, 'app/img'),
		data: path.join(__dirname, 'app/data')
	},
	build: {
		root: path.join(__dirname, 'build'),
		app: {
			root: path.join(__dirname, 'build/app'),
			img: path.join(__dirname, 'build/app/img'),
			data: path.join(__dirname, 'build/app/data')
		}
	}
};

/**
 * Log message to console
 * @param msg
 */
const log = msg => {
	if (typeof(msg) === 'object') {
		for (let item in msg) {
			if (msg.hasOwnProperty(item)) {
				$tsk.util.log($tsk.util.colors.gray(msg[item]));
			}
		}
	} else {
		$tsk.util.log($tsk.util.colors.gray(msg));
	}
};

/**
 * rm -rf
 * @param paths {array} rm destination
 * @returns {void|NodeJS.ReadWriteStream} deletion task
 */
const clean = paths => del(paths)
	.then(path => {
		log(path)
	});

/**
 *
 * @param pathFrom {string} copy from path
 * @param pathTo {string} copy to path
 * @returns {NodeJS.ReadWriteStream} copying task
 */
const copy = (pathFrom, pathTo) => {
	log(`\nCopying files:\n from: ${pathFrom}\n to:   ${pathTo}`);
	return gulp
		.src(pathFrom)
		.pipe(gulp.dest(pathTo));
};

/**
 * Image optimization
 * @returns {void|NodeJS.ReadWriteStream} gulp task
 */
const imageMinification = () => {
	const path = `${PATH.build.app.img}/**/*.*`;

	log('Compressing build images');

	return gulp
		.src(path)
		.pipe($tsk.imagemin({
			verbose: false,
			progressive: true,
			optimizationLevel: 7
		}))
		.pipe(gulp.dest(PATH.build.app.img))
};

/**
 * JSON optimization
 * @returns {void|NodeJS.ReadWriteStream} gulp task
 */
const jsonMinification = () => {
	const path = `${PATH.build.app.data}/*.json`;

	log('Compressing build data');

	return gulp
		.src(path)
		.pipe($tsk.jsonminify())
		.pipe(gulp.dest(PATH.build.app.data))
};

/**
 * Bumping version number and tagging the repository with it.
 *
 * --type=pre will bump prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump minor version *.x.*
 * --type=major will bump the major version x.*.*
 */
const bumpFiles = ['./package.json', './config.js'];
const newVer = semver.inc(pkg.version, args.type);

gulp.task('bump', () => {
	log(`Versioning to v${newVer}`);

	return gulp
		.src(bumpFiles)
		.pipe($tsk.bump({version: newVer}))
		.pipe($tsk.print())
		.pipe(gulp.dest('./'));
});

gulp.task('git-add-bump', () => {
	log(`adding ${bumpFiles.join(', ')} to commit`);
	return gulp.src(bumpFiles).pipe($tsk.git.add());
});

gulp.task('git-commit-bump', () => {
	return gulp.src('.').pipe($tsk.git.commit(`publish: v${newVer}`));
});

gulp.task('git-tag-bump', done => {
	$tsk.git.tag(`v${newVer}`, '', err => {
		if (err) throw err;
	});
	done();
});

gulp.task('git-push-bump', done => {
	$tsk.git.push('origin', pkg.config.env, {args: ' --tags'}, err => {
		if (err) throw err;
	});
	done();
});

gulp.task('pimp', gulp.series(
	'bump',
	'git-add-bump',
	'git-commit-bump',
	'git-tag-bump',
	'git-push-bump'
), done => {
	done();
});

/**
 * Building app
 */
gulp.task('build', gulp.series(
	clean.bind(null, [
		`${PATH.build.app.img}/favicons`
	]),
	gulp.parallel(
		imageMinification, // optimize build images
		jsonMinification, // optimize build data
		copy.bind(null, `${PATH.app.root}/robots.txt`, `${PATH.build.root}`), // copy robots.txt
		copy.bind(null, `${PATH.app.img}/favicons/**.*`, `${PATH.build.app.img}/favicons`), // copy favicons
		copy.bind(null, `${PATH.app.img}/pictures/**.*`, `${PATH.build.app.img}/pictures`) // copy landing images
	)
));
