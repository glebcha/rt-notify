/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-global-import": {
      globalizeKeyframes: true,
    },
    "postcss-mixins": {
      mixinsFiles: path.join(
        __dirname,
        "src",
        "styles",
        "mixins",
        "!(*.spec.js)"
      ),
    },
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },
  },
};
