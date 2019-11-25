import { Colors, Status } from '../types'

export function getColorByType(type: Status, colors: Colors): { background: string, border: string } {
  const red = typeof colors.red !== 'string' ? colors.red['600'] : colors.red
  const grey = typeof colors.grey !== 'string' ? colors.grey['200'] : colors.grey

  const color = {
    background: typeof colors.green !== 'string' ? colors.green['200'] : colors.green,
    border: typeof colors.green !== 'string' ? colors.green['300'] : colors.green,
  }

  switch (type) {
    case 'waiting':
      color.background = grey
      color.border = grey
      break
    case 'error':
      color.background = red
      color.border = red
      break
  }

  return color
}
