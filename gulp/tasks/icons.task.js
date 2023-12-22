import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'

import { paths } from '../config/index.js'

const iconsTask = () =>
	gulp
		.src(paths.src.icons)
		.pipe(
			plumber(
				notify.onError({
					title: 'Icons',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(gulp.dest(paths.build.icons))
		.pipe(browserSync.stream())

export default iconsTask
