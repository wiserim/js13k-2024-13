import { defineConfig } from "vite";
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	base: "/",
	server: {
	    port: 3000,
	},
	plugins: [
		eslint({
			cache: false,
			include: ['../src/**/*.js'],
		    exclude: ['../config/**/*.js'],
		})
	]
});