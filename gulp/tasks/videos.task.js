import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'

import { paths } from '../config/index.js'

const videosTask = () =>
	gulp
		.src(paths.src.videos)
		.pipe(
			plumber(
				notify.onError({
					title: 'Videos',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(gulp.dest(paths.build.videos))
		.pipe(browserSync.stream())

export default videosTask
