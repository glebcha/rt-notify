import React from 'react';
import { IconProps } from './types';

export const Error = ({ style, fill, width, height, className, viewBox, onClick }: IconProps): React.ReactElement => (
  <svg
    style={style}
    width={width}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`rt-notify-icon ${className}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    onClick={onClick}
  >
    <path d="M256,7C118.467,7,7,118.468,7,256.002C7,393.533,118.467,505,256,505s249-111.467,249-248.998  C505,118.468,393.533,7,256,7z M256,485.08c-126.31,0-229.08-102.771-229.08-229.078C26.92,129.692,129.69,26.92,256,26.92  c126.309,0,229.08,102.771,229.08,229.082C485.08,382.309,382.309,485.08,256,485.08z" fill={fill}/>
    <polygon fill={fill} points="368.545,157.073 354.461,142.988 255.863,241.587 157.733,143.456 143.648,157.54 241.78,255.672   143.648,353.809 157.733,367.893 255.863,269.75 354.461,368.361 368.545,354.275 269.947,255.672 "/>
  </svg>
);
