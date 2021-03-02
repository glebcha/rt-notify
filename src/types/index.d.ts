export type Colors = {
  [color: string]: string | {[code: string]: string}
}

export type Theme = {
  colors: Colors
}

export type Animation = 'fade' | 'bounce' | 'zoom'
export type Status = 'waiting' | 'success' | 'error'
export type Placement = 'top' | 'bottom' | 'left' | 'right'