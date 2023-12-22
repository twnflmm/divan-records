import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'

import { paths } from '../config/index.js'

const faviconsTask = () =>
	gulp
		.src(paths.src.favicons)
		.pipe(
			plumber(
				notify.onError({
					title: 'Favicons',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(gulp.dest(paths.build.icons))
		.pipe(browserSync.stream())

export default faviconsTask
