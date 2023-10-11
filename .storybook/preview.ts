import type { Preview } from "@storybook/web-components";
import '../src/blueprintds.js';
import '../src/style.css';

import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/shoelace.js';

console.log('Preview', { doc: document});

const headEl = document.querySelector('head');
const shoelaceScripts = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/themes/light.css" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');
  body {
    font-family: 'Inter', sans-serif;
  }
</style>
`;
headEl?.insertAdjacentHTML('beforeend', shoelaceScripts);

const bodyEl = document.querySelector('body');
const shoelaceAutoloader = `
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/shoelace-autoloader.js"></script>
`;
bodyEl?.insertAdjacentHTML('beforeend', shoelaceAutoloader);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
