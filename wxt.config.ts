import vue from "@vitejs/plugin-vue";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",

  manifest: {
    name: "mindful",
    description: "mindful app",
    permissions: ["tabs", "storage", "webRequest", "webNavigation"],
  },

  imports: {
    addons: {
      vueTemplate: true,
    },
    presets: ["vue"],
  },
  vite: () => ({
    plugins: [vue()],
  }),
});
