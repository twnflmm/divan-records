import browserSync from 'browser-sync'

import { constants } from '../config/index.js'

const { BUILD_FOLDER_PATH, SERVER_START_PAGE_FILE_PATH, PORT } = constants

const devServerTask = () => {
	browserSync.init({
		server: {
			baseDir: `${BUILD_FOLDER_PATH}`
		},
		port: PORT,
		startPath: `${SERVER_START_PAGE_FILE_PATH}`
	})
}

export default devServerTask
