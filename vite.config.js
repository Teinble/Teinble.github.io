import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	define: {
		"import.meta.env.VITE_BUILD_TIME": JSON.stringify(new Date().toISOString()),
	},
	server: {
		port: 3000,
		open: true,
	},
	build: {
		outDir: "dist",
		sourcemap: true,
	},
});
