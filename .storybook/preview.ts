import type { Preview } from "@storybook/web-components";
import '../src/blueprintds.js';

import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/shoelace.js';

console.log('Preview', { doc: document});

const headEl = document.querySelector('head');
const shoelaceScripts = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/themes/light.css" />
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
