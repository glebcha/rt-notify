import * as React from 'react'

export type Colors = {
  [color: string]: string | {[code: string]: string}
}

export type Theme = {
  colors: Colors
}

export interface NotificationProps {
  id?: string | number
  type: string
  content: React.ReactNode
  width?: string
  timeout?: number | null
  onClose?: (event?: React.MouseEventHandler<HTMLElement>) => void
}

export interface NotificationsProps {
  notifications: Array<NotificationProps>
  placement: string
  defaultTimeout: number
  animationTimeout: number
  theme?: Theme
  duplicatePlaceholder?: React.ReactElement
}
