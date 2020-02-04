import * as React from 'react';

export type Colors = {
  [color: string]: string | {[code: string]: string}
}
export type Theme = {
  colors: Colors
}
export type Animation = 'fade' | 'bounce' | 'zoom'
export type Status = 'waiting' | 'success' | 'error'
export type Placement = 'top' | 'bottom' | 'left' | 'right'

export interface NotificationProps {
  id?: string | number
  type?: Status
  content: React.ReactNode
  width?: string
  timeout?: number | null
  onClose?: (event?: React.MouseEventHandler<HTMLElement>) => void
}

export interface NotificationsProps {
  notifications: Array<NotificationProps>
  animation?: Animation
  placement?: Placement
  defaultTimeout?: number
  duplicatePlaceholder?: React.ReactElement | null
}