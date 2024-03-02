import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
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
