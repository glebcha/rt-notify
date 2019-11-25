import { Placement } from '../types'

export function getCssTransform(placement: Placement): string {
  const isY = ['top', 'bottom'].includes(placement)
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
