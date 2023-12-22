import gulp from 'gulp'

import {
	cleanTask,
	htmlTask,
	devServerTask,
	stylesTask,
	scriptsTask,
	utilsScriptsTask,
	imagesTask,
	iconsTask,
	faviconsTask,
	deleteTempFolderTask,
	videosTask,
	audioTask,
	ftpDeployTask
} from './gulp/tasks/index.js'

import { oftToTtfTask, ttfToWoffTask, ttfToWoff2Task, generateFontsStyleTask } from './gulp/tasks/fonts/index.js'

import { paths } from './gulp/config/index.js'

const fontsSeries = gulp.series(
	oftToTtfTask,
	gulp.parallel(ttfToWoffTask, ttfToWoff2Task),
	deleteTempFolderTask,
	generateFontsStyleTask
)
const imagesTasks = gulp.parallel(imagesTask, iconsTask, faviconsTask)
const mainTasks = gulp.parallel(
	htmlTask,
	gulp.series(fontsSeries, stylesTask),
	scriptsTask,
	utilsScriptsTask,
	imagesTasks,
	videosTask,
	audioTask
)

const getWatcher = (task = () => Promise.resolve(true)) => () => {
	gulp.watch(paths.watch.html, gulp.series(htmlTask, task))
	gulp.watch(paths.watch.styles, gulp.series(stylesTask, task))
	gulp.watch(paths.watch.scripts, gulp.series(scriptsTask, task))
	gulp.watch(paths.watch.utilsScripts, gulp.series(utilsScriptsTask, task))
	gulp.watch(paths.watch.images, gulp.series(imagesTasks, task))
	gulp.watch(paths.watch.videos, gulp.series(videosTask, task))
	gulp.watch(paths.watch.audio, gulp.series(audioTask, task))
}

const watcher = getWatcher()
const ftpDeployWatcher = getWatcher(ftpDeployTask)

const buildSeries = gulp.series(cleanTask, mainTasks)
const devServerOnWatchTasks = gulp.parallel(getWatcher(), devServerTask)
const devServerSeries = gulp.series(buildSeries, devServerOnWatchTasks)
const deploySeries = gulp.series(buildSeries, ftpDeployTask)
const deployOnWatchSeries = gulp.series(deploySeries, getWatcher(ftpDeployTask))

gulp.task('default', devServerSeries)
gulp.task('build', buildSeries)
gulp.task('generateFonts', fontsSeries)
gulp.task('server', devServerOnWatchTasks)
gulp.task('deploy', ftpDeployTask)
gulp.task('deploy:build', deploySeries)
gulp.task('deploy:watch', deployOnWatchSeries)
