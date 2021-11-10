<img width="300px" src="https://cdn1.iconfinder.com/data/icons/just-for-fun/64/__notification_messege_alarm-512.png" />

# [rt-notify](https://glebcha.github.io/rt-notify/)

[![npm version](https://badge.fury.io/js/rt-notify.svg)](https://badge.fury.io/js/rt-notify)

React notifications made simple, yet powerful

##### All dynamic styling propeties made with css variables and fallback to default properties.

```
const notification = {
  type: 'waiting',
  content: 'Waiting Notification New',
  width: '700px',
  onClose: () => console.log('CLOSED WAITING NOTIFICATION')
}

type Animation = 'fade' | 'bounce' | 'zoom'
type Status = 'waiting' | 'success' | 'error'
type Placement = 'top' | 'bottom' | 'left' | 'right'

interface NotificationProps {
  id?: string | number
  type?: Status
  content: React.ReactNode
  width?: string
  timeout?: number | null
  onClose?: (event?: React.MouseEventHandler<HTMLElement>) => void
}

interface NotificationsProps {
  notifications: Array<NotificationProps>
  animation?: Animation
  placement?: Placement
  defaultTimeout?: number
  duplicatePlaceholder?: React.ReactElement | null
}
```
