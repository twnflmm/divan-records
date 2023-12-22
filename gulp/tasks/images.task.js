import gulp from 'gulp'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import newer from 'gulp-newer'
import webp from 'gulp-webp'
import imageMin from 'gulp-imagemin'
import gulpIf from 'gulp-if'

import { constants, paths } from '../config/index.js'

const imagesTask = () =>
	gulp
		.src(paths.src.images)
		.pipe(
			plumber(
				notify.onError({
					title: 'Images',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(newer(paths.build.images))
		.pipe(webp())
		.pipe(gulp.dest(paths.build.images))
		.pipe(gulpIf(!constants.IS_DEV_MODE, gulp.src(paths.src.images)))
		.pipe(gulpIf(!constants.IS_DEV_MODE, newer(paths.build.images)))
		.pipe(
			gulpIf(
				!constants.IS_DEV_MODE,
				imageMin({
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3
				})
			)
		)
		.pipe(gulp.dest(paths.build.images))
		.pipe(browserSync.stream())

export default imagesTask
