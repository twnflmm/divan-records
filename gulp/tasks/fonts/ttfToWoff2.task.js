import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import ttf2woff2 from 'gulp-ttf2woff2'

import { paths, constants } from '../../config/index.js'

const ttfToWoff2Task = () =>
	gulp
		.src([`${paths.src.fontsFolder}/*.ttf`, `${constants.TEMP_FOLDER_PATH}/*.ttf`], {})
		.pipe(
			plumber(
				notify.onError({
					title: 'Ttf Fonts',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(paths.build.fonts))

export default ttfToWoff2Task
