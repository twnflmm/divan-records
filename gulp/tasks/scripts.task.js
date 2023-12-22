import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import { babel } from '@rollup/plugin-babel'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import rollup from '@rollup/stream'
import nodeResolve from '@rollup/plugin-node-resolve'
import minify from 'gulp-minify'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import gulpIf from 'gulp-if'
import browserSync from 'browser-sync'

import { paths, constants } from '../config/index.js'

let cache

const scriptsTask = () =>
	rollup({
		input: paths.src.scripts,
		plugins: [babel(), nodeResolve()],
		cache,
		output: {
			format: 'iife',
			sourcemap: constants.IS_DEV_MODE
		}
	})
		.on('bundle', (bundle) => {
			cache = bundle
		})
		.pipe(
			plumber(
				notify.onError({
					title: 'Scripts',
					sound: false,
					message: 'Error: <%= error.message %>'
				})
			)
		)
		.pipe(source(constants.SCRIPTS_BUNDLE_NAME))
		.pipe(buffer())
		.pipe(
			gulpIf(
				!constants.IS_DEV_MODE,
				minify({
					noSource: true
				})
			)
		)
		.pipe(gulpIf(!constants.IS_DEV_MODE, uglify()))
		.pipe(gulpIf(!constants.IS_DEV_MODE, rename(constants.SCRIPTS_BUNDLE_NAME)))
		.pipe(gulpIf(constants.IS_DEV_MODE, sourcemaps.init({ loadMaps: true })))
		.pipe(gulpIf(constants.IS_DEV_MODE, sourcemaps.write('.')))
		.pipe(gulp.dest(paths.build.scripts))
		.pipe(browserSync.stream())

export default scriptsTask
