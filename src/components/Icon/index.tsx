import React from 'react'
import { icons } from './icons'

export const Icon = ({
  name = 'success',
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  viewBox = '0 0 32 32',
  onClick = (): void => {},
}: {
  name?: string
  fill?: string
  width?: string
  className?: string
  style?: {[key: string]: string}
  viewBox?: string
  onClick?: () => void
}): React.ReactElement => {
  const SelectedIcon = icons[name]

  return <SelectedIcon
    fill={fill}
    style={style}
    width={width}
    height={width}
    viewBox={viewBox}
    className={className}
    onClick={onClick}
  />
}
