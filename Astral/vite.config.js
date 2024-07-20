import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all"; // <= import the plugin

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		pluginRewriteAll(),
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
