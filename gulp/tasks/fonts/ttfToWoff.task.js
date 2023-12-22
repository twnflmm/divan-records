import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import fonter from 'gulp-fonter'

import { paths, constants } from '../../config/index.js'

const ttfToWoffTask = () =>
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
		.pipe(
			fonter({
				formats: ['woff']
			})
		)
		.pipe(gulp.dest(paths.build.fonts))

export default ttfToWoffTask
