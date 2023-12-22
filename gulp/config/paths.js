import constants from './constants.js'

const { BUILD_FOLDER_PATH, SRC_FOLDER_PATH } = constants

const paths = {
	build: {
		html: `${BUILD_FOLDER_PATH}/`,
		styles: `${BUILD_FOLDER_PATH}/styles`,
		scripts: `${BUILD_FOLDER_PATH}/scripts`,
		images: `${BUILD_FOLDER_PATH}/files/images`,
		icons: `${BUILD_FOLDER_PATH}/files/icons`,
		fonts: `${BUILD_FOLDER_PATH}/files/fonts`,
		videos: `${BUILD_FOLDER_PATH}/files/videos`,
		audio: `${BUILD_FOLDER_PATH}/files/audio`
	},
	src: {
		html: `${SRC_FOLDER_PATH}/html/pages/*.html`,
		styles: `${SRC_FOLDER_PATH}/styles/style.scss`,
		scripts: `${SRC_FOLDER_PATH}/scripts`,
		utilsScripts: `${SRC_FOLDER_PATH}/utilsScripts`,
		images: `${SRC_FOLDER_PATH}/files/images/*.{jpg,jpeg,png,gif,webp}`,
		icons: `${SRC_FOLDER_PATH}/files/icons/*.svg`,
		favicons: `${SRC_FOLDER_PATH}/files/favicons/*.ico`,
		fontsFolder: `${SRC_FOLDER_PATH}/files/fonts`,
		videos: `${SRC_FOLDER_PATH}/files/videos/*.{ogg,ogv,mp4,webm}`,
		audio: `${SRC_FOLDER_PATH}/files/audio/*.{ogg,mp3,webm}`
	},
	watch: {
		html: `${SRC_FOLDER_PATH}/html/**/*.html`,
		styles: `${SRC_FOLDER_PATH}/styles/**/*.scss`,
		scripts: `${SRC_FOLDER_PATH}/scripts/**/*.js`,
		utilsScripts: `${SRC_FOLDER_PATH}/utilsScripts/**/*.js`,
		images: `${SRC_FOLDER_PATH}/files/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
		videos: `${SRC_FOLDER_PATH}/files/videos/*.{ogg,ogv,mov,mp4,webm}`,
		audio: `${SRC_FOLDER_PATH}/files/audio/*.{ogg,mp3,webm}`
	}
}

export default paths
