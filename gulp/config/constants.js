import { basename, resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config()

const constants = {
	ROOT_FOLDER_NAME: basename(resolve()),
	SRC_FOLDER_PATH: './src',
	BUILD_FOLDER_PATH: './dist',
	TEMP_FOLDER_PATH: './src/files/temp',
	FTP_DEPLOY_FOLDER_PATH: '/var/www/u1780911/data/www/apgard.u1780911.isp.regruhosting.ru',
	SCRIPTS_BUNDLE_NAME: 'main.bundle.js',
	STYLES_BUNDLE_NAME: 'styles.bundle.css',
	UTILS_BUNDLE_NAME: 'utils.bundle.js',
	PORT: 3000,
	IS_DEV_MODE: process.env.NODE_ENV === 'development',
	SERVER_START_PAGE_FILE_PATH: './index.html',
	FONTS_STYLE_FILE_PATH: './src/styles/base/_fonts.scss'
}

export default constants
