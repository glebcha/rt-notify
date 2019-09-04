import React from 'react'
import { icons } from './icons'

export const Icon = ({
  name = '',
  style = {},
  fill = '#000',
  width = '100%',
  className = '',
  viewBox = '0 0 32 32',
  onClick = () => {},
}) => {
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
