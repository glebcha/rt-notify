import React from 'react'
import { IconProps } from './types'

export const Success = ({ style, fill, width, className, viewBox, onClick }: IconProps): React.ReactElement => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`rt-notify-icon ${className}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    onClick={onClick}
  >
    <path d="M256,6.998c-137.533,0-249,111.467-249,249c0,137.534,111.467,249,249,249s249-111.467,249-249  C505,118.464,393.533,6.998,256,6.998z M256,485.078c-126.309,0-229.08-102.771-229.08-229.081  c0-126.31,102.771-229.08,229.08-229.08c126.31,0,229.08,102.771,229.08,229.08C485.08,382.307,382.31,485.078,256,485.078z" fill={fill}/>
    <polygon fill={fill} points="384.235,158.192 216.919,325.518 127.862,236.481 113.72,250.624 216.919,353.803 398.28,172.334   "/>
  </svg>
)
