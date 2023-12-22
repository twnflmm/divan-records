import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import fonter from 'gulp-fonter'

import { paths, constants } from '../../config/index.js'

const otfToTtfTask = () =>
	gulp
		.src(`${paths.src.fontsFolder}/*.otf`, {})
		.pipe(
			plumber(
				notify.onError({
					title: 'Otf Fonts',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(
			fonter({
				formats: ['ttf']
			})
		)
		.pipe(gulp.dest(constants.TEMP_FOLDER_PATH))

export default otfToTtfTask
