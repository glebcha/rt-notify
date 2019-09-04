export function getCssTransform(placement: string) {
  const isY = ['top', 'bottom'].indexOf(placement) >= 0
  let percentage = ''

  switch (placement) {
    case 'top':
    case 'left':
      percentage = '-100%'
      break
    case 'bottom':
    case 'right':
      percentage = '100%'
      break
  }

  return `&.${placement}.notification-exit  {
      transform: translate${isY ? 'Y' : 'X'}(${percentage});
    }`
}
