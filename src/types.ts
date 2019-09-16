import * as React from 'react'

export type Theme = {
  colors: {
    [color: string]: string | {
      [code: string]: string}
    }
}

export interface INotification {
  id?: string | number
  type: string
  content: React.ReactNode
  width?: string
  timeout?: number | null
  onClose?: (event?: React.MouseEventHandler<HTMLElement>) => void
}

export interface INotifications {
  notifications: Array<INotification>
  placement: string
  defaultTimeout: number
  animationTimeout: number
  theme?: Theme
  duplicatePlaceholder?: React.ReactElement
}
