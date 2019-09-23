import React from 'react'
import { IconProps } from './types'

export const Waiting = ({ style, fill, width, className, viewBox, onClick }: IconProps): React.ReactElement => (
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
    <g>
      <path d="M256.108,3.652c-139.166,0-252,112.834-252,252c0,139.167,112.834,252,252,252s252-112.833,252-252   C508.108,116.486,395.274,3.652,256.108,3.652z M256.108,486.652c-127.374,0-231-103.626-231-231c0-127.373,103.626-231,231-231   s231,103.627,231,231C487.108,383.027,383.483,486.652,256.108,486.652z" fill={fill}/>
      <polygon fill={fill} points="256.108,276.652 130.108,276.652 130.108,297.652 277.108,297.652 277.108,88.514 256.108,88.514"/>
    </g>
  </svg>
)
