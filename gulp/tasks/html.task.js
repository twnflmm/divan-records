import gulp from 'gulp'
import fileInclude from 'gulp-file-include'
import browserSync from 'browser-sync'
import webpHtmlNoSvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import replace from 'gulp-replace'
import gulpIf from 'gulp-if'

import { constants, paths, prefixes } from '../config/index.js'

const htmlTask = () =>
	gulp
		.src(paths.src.html)
		.pipe(
			plumber(
				notify.onError({
					title: 'HTML',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(
			fileInclude({
				basepath: './src/html'
			})
		)
		.pipe(replace(prefixes.favicons.prefix, prefixes.favicons.path))
		.pipe(replace(prefixes.images.prefix, prefixes.images.path))
		.pipe(replace(prefixes.icons.prefix, prefixes.icons.path))
		.pipe(replace(prefixes.videos.prefix, prefixes.videos.path))
		.pipe(replace(prefixes.styles.prefix, prefixes.styles.path))
		.pipe(replace(prefixes.scripts.prefix, prefixes.scripts.path))
		.pipe(replace(prefixes.utilsScripts.prefix, prefixes.utilsScripts.path))
		.pipe(webpHtmlNoSvg())
		.pipe(
			versionNumber({
				value: '%DT%',
				append: {
					key: '_v',
					cover: 0,
					to: ['css', 'js']
				},
				output: {
					file: 'gulp/version.json'
				}
			})
		)
		.pipe(gulp.dest(paths.build.html))
		.pipe(browserSync.stream())

export default htmlTask
