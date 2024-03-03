import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',

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
