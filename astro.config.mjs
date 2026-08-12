import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL || 'https://motoristaops.henrico.works';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  site,
  base,
  build: {
    format: 'directory'
  }
});
