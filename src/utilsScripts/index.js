import checkSupportedWebp from './checkSupportedWebp.js'

window.addEventListener('DOMContentLoaded', () => {
	checkSupportedWebp((isSupported) => document.querySelector('body').classList.add(isSupported ? 'webp' : 'no-webp'))
})
