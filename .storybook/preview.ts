import type { Preview } from "@storybook/web-components";
import '../src/blueprintds.js';
import '../src/style.css';

import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/shoelace.js';

// Uncomment the following line to use the popover polyfill
// import 'https://unpkg.com/@oddbird/popover-polyfill@0.2.3/dist/popover.min.js';

console.log('Preview', { doc: document});

const shoelaceLightThemeLink = document.createElement('link');
shoelaceLightThemeLink.rel = 'stylesheet';
shoelaceLightThemeLink.href = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/themes/light.css';
document.head.appendChild(shoelaceLightThemeLink);

const shoelaceScripts = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/themes/light.css" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');
  body {
    font-family: 'Inter', sans-serif;
  }
</style>
`;
document.head.insertAdjacentHTML('beforeend', shoelaceScripts);

const shoelaceAutoloaderScript = document.createElement('script');
shoelaceAutoloaderScript.type = 'module';
shoelaceAutoloaderScript.src = 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.9.0/cdn/shoelace-autoloader.js';
document.head.appendChild(shoelaceAutoloaderScript);

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
