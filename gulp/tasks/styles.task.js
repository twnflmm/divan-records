import gulp from 'gulp'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'
import replace from 'gulp-replace'
import sourcemaps from 'gulp-sourcemaps'
import groupCssMediaQueries from 'gulp-group-css-media-queries'
import cleanCss from 'gulp-clean-css'
import webpCss from 'gulp-webpcss'
import autoprefixer from 'gulp-autoprefixer'
import gulpIf from 'gulp-if'

import { constants, paths, prefixes } from '../config/index.js'

const scss = gulpSass(dartSass)

const stylesTask = () =>
	gulp
		.src(paths.src.styles, { sourcemaps: true })
		.pipe(
			plumber(
				notify.onError({
					title: 'Styles',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(replace(prefixes.images.prefix, prefixes.images.stylesPath))
		.pipe(replace(prefixes.icons.prefix, prefixes.icons.stylesPath))
		.pipe(replace(prefixes.fonts.prefix, prefixes.fonts.path))
		.pipe(gulpIf(!constants.IS_DEV_MODE, groupCssMediaQueries()))
		.pipe(
			gulpIf(
				constants.IS_DEV_MODE,
				webpCss({
					webpClass: '.webp',
					noWebpClass: '.no-webp'
				})
			)
		)
		.pipe(
			gulpIf(
				!constants.IS_DEV_MODE,
				autoprefixer({
					grid: true,
					overrideBrowsersList: ['last 3 versions'],
					cascade: true
				})
			)
		)
		.pipe(gulpIf(!constants.IS_DEV_MODE, cleanCss()))
		.pipe(rename(constants.STYLES_BUNDLE_NAME))
		.pipe(gulpIf(constants.IS_DEV_MODE, sourcemaps.init({ loadMaps: true })))
		.pipe(gulpIf(constants.IS_DEV_MODE, sourcemaps.write('.')))
		.pipe(gulp.dest(paths.build.styles))
		.pipe(browserSync.stream())

export default stylesTask
