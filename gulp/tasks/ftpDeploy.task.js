import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util'

import { ftpConfig, constants } from '../config/index.js'

const ftpDeployTask = () => {
	ftpConfig.log = util.log
	const ftpConnect = vinylFTP.create(ftpConfig)

	return gulp
		.src(`${constants.BUILD_FOLDER_PATH}/**/*.*`)
		.pipe(
			plumber(
				notify.onError({
					title: 'FTP',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(ftpConnect.dest(`${constants.FTP_DEPLOY_FOLDER_PATH}/${constants.ROOT_FOLDER_NAME}`))
}

export default ftpDeployTask
