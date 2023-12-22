import fs from 'fs'
import gulp from 'gulp'

import { constants, paths } from '../../config/index.js'

const toCapitalize = (string) => (string ? `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}` : '')

const generateFontsStyleTask = () => {
	fs.readdir(paths.build.fonts, (err, fontsFiles) => {
		if (!fontsFiles) {
			return
		}

		if (fs.existsSync(constants.FONTS_STYLE_FILE_PATH)) {
			console.log(`Файл ${constants.FONTS_STYLE_FILE_PATH} уже существует. Для обновления файла нужно его удалить!`)

			return
		}

		fs.writeFile(constants.FONTS_STYLE_FILE_PATH, '', () => {})
		let newFontFileNameOnly

		fontsFiles.forEach((fontsFile) => {
			const fontFileName = fontsFile.split('.').shift()

			if (newFontFileNameOnly === fontFileName) {
				return
			}

			const fontName = fontFileName.split('-').shift() || fontFileName
			const fontWeightType = fontFileName.split('-').pop() || fontFileName

			let fontWeight = 400

			switch (fontWeightType.toLowerCase()) {
				case 'thin':
					fontWeight = 100

					break
				case 'extralight':
					fontWeight = 200

					break
				case 'light':
					fontWeight = 300

					break
				case 'medium':
					fontWeight = 500

					break
				case 'semibold':
					fontWeight = 600

					break
				case 'bold':
					fontWeight = 700

					break
				case 'extrabold':
					fontWeight = 800

					break
				case 'heavy':
					fontWeight = 800

					break
				case 'black':
					fontWeight = 900

					break
				default:
			}

			const mixinName = `FontFamily${toCapitalize(fontName)}${toCapitalize(fontWeightType)}`
			fs.appendFile(
				constants.FONTS_STYLE_FILE_PATH,
				`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("@fonts/${fontFileName}.woff2") format("woff2"), url("@fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n${String.fromCharCode(
					64
				)}mixin ${mixinName} {\n\tfont-family: ${fontName}, sans-serif;\n\tfont-weight: ${fontWeight};\n\tline-height: 140%;\n}\r\n\r\n`,
				() => {}
			)

			newFontFileNameOnly = fontFileName
		})
	})

	return gulp.src(constants.SRC_FOLDER_PATH)
}

export default generateFontsStyleTask
