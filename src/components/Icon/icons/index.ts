import { Error } from './Error'
import { Success } from './Success'
import { Waiting } from './Waiting'
import { Cross } from './Cross'

export type IconProps = { 
  style: React.CSSProperties, 
  fill: string, 
  width: string, 
  height: string,
  className: string, 
  viewBox: string, 
  onClick: () => void,
}

declare interface Icons {
  [id: string]: React.ElementType
}

export const icons: Icons = {
  success: Success,
  waiting: Waiting,
  error: Error,
  cross: Cross,
}