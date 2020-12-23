const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/app.js", // input files
	output: {
		filename: "app.js",  // bundled files
		path: path.resolve(__dirname, "assets", "scripts"),  // access to where puts the output file
		publicPath: "assets/scripts/"  // point at exactly direction in case there are multiple bundled files
	},
	devtool: "cheap-source-map", // generating sourcemap in minimized code
	plugins: [
		new CleanPlugin.CleanWebpackPlugin(),
	],
};