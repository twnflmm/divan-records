const checkSupportedWebp = (callback) => {
	const webP = new Image()
	webP.onload = () => callback(webP.height === 2)
	webP.onerror = () => callback(webP.height === 2)
	webP.src =
		'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}

export default checkSupportedWebp
