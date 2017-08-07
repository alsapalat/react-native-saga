const preloader = (key, set = true) => {
	if(!key)
		return { type: "CLEAR_PRE_LOADER" }
	if(set)
		return { type: "SET_LOADING", key }
	return { type: "DONE_LOADING", key }
}

const navigateTo = (key) => {
	return { type: "NAVIGATE_TO", key }
}

module.exports = {
	preloader,
	navigateTo
}