/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const path = require('path');
const themePath = path.join(process.cwd(), 'src', 'styles', 'theme.json');
const { colors } = require(themePath);

function getColors(prefix = '') {
  return Object.keys(colors).reduce((palette, key) => {
    const color = colors[key];
    const spectrum = Object.keys(color).reduce((acc, colorKey) => ({ ...acc, [`${prefix}${key}-${colorKey}`]: color[colorKey] }), {});

    return { ...palette, ...spectrum};
  }, {});
}

function getColorByType(type) {
  const palette = getColors();
  let border;
  let background;

  switch (type) {
    case 'success':
      background = palette['green-200'];
      border = palette['green-300'];
      break;
    case 'waiting':
      background = palette['grey-200'];
      border = palette['grey-300'];
      break;
    case 'error':
      background = palette['red-200'];
      border = palette['red-300'];
      break;
  }

  return {
    [`:global .t-notify-root .${type}`]: { border, background },
    [`:global .t-notify-root [data-icontype="${type}"]`]: { background: border },
  };
}

module.exports = () => {
  const prefix = '--t-notify-';
  const types = ['success', 'waiting', 'error'];
  const mappedTypes = types.reduce((typeset, type) => ({ ...typeset, ...getColorByType(type) }), {});

  return {
    ...mappedTypes,
    ':root': getColors(prefix),
  };
};
