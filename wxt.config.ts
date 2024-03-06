import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',

  manifest: {
    name: 'mindful',
    description: 'mindful app',
    permissions: [
      "tabs",
      "storage",
      "webRequest",
      "webNavigation"
    ]
  },

  runner: {
    disabled: true, // disabled until brave support can be figured out
    // openConsole: true,
    // openDevtools: true,
    // binaries: {
    //   brave: 'Brave Browser',
    // }
  },

  imports: {
    addons: {
      vueTemplate: true,
    },
    presets: ['vue'],

  },
  vite: () => ({
    plugins: [vue()],
  }),
});
