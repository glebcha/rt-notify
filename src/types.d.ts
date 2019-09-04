import * as React from 'react'

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
  theme?: Object
  duplicatePlaceholder?: React.ReactElement
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    width?: string
    type?: string
    placement?: string
    animationTimeout?: number
  }
}