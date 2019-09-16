import React from 'react'
import { IconProps } from './types'

export const Cross = ({ style, fill, width, className, viewBox, onClick }: IconProps) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`t-notify-icon ${className}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    onClick={onClick}
  >
    <polygon fill={fill} points="368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 "/>
  </svg>
)
