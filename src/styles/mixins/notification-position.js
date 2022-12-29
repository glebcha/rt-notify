function getCssTransform(placement) {
  const rule = `:global .${placement}.rt-notify-exit`;
  const isY = placement && ['top', 'bottom'].includes(placement);
  let percentage = '';

  switch (placement) {
    case 'top':
    case 'left':
      percentage = '-100%';
      break;
    case 'bottom':
    case 'right':
      percentage = '100%';
      break;
    default:
      percentage = '100%';
      break;
  }

  return {
   [rule]: {
      transform: `translate${isY ? 'Y' : 'X'}(${percentage})`,
   }   
  };
}

module.exports = () => {
  const positions = ['top', 'left', 'bottom', 'right'];
  const result = positions.reduce((ruleset, placement) => ({ ...ruleset, ...getCssTransform(placement) }), {});

  return result;
};
