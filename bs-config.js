module.exports = {
	proxy: `localhost:8888/todo`,
	files: [
		`./index.html`,
		`./src/**/*`
	],
	cwd: `./htdocs/`
};
