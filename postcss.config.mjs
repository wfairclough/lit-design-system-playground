import autoprefixer from 'autoprefixer';
import postcssResetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import';

console.log('\nParsing postcss.config.mjs\n');

export default {
  plugins: [
    autoprefixer(),
    postcssResetEnv(),
    postcssImport(),
  ],
};

