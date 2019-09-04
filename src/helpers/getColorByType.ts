export function getColorByType(type: string, colors: any) {
  const color = {
    background: colors.green['200'],
    border: colors.green['300'],
  }

  switch (type) {
    case 'waiting':
      color.background = colors.grey['200']
      color.border = colors.grey['200']
      break
    case 'error':
      color.background = colors.red['600']
      color.border = colors.red['600']
      break
  }

  return color
}
