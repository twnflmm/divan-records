import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'

import { paths } from '../config/index.js'

const audioTask = () =>
	gulp
		.src(paths.src.audio)
		.pipe(
			plumber(
				notify.onError({
					title: 'Audio',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(gulp.dest(paths.build.audio))
		.pipe(browserSync.stream())

export default audioTask
