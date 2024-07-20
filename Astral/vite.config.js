import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all"; // <= import the plugin
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		pluginRewriteAll(),
		babel(),
		react({
			include: /\.(jsx|tsx)$/,
			babel: {
				plugins: ["styled-components"],
				babelrc: false,
				configFile: false,
			},
		}),
	],
});
