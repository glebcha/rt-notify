# [t-notify](https://glebcha.github.io/t-notify/)
React notifications made simple, yet powerful

```
const theme = {
  colors: {
    red: {
      [600]: '#c2112c',
    },
    green: {
      [200]: '#beefd2',
      [300]: '#89e3ae',
    },
    grey: {
      [200]: '#edeef0',
    },
    black: '#000000',
    white: '#ffffff',
  },
}

type Theme = {
  colors: {
    [color: string]: string | {
      [code: string]: string}
    }
}

const notification = { 
  type: 'waiting', 
  content: 'Waiting Notification New', 
  width: '700', 
  onClose: () => console.log('CLOSED WAITING NOTIFICATION') 
}

interface INotification {
  id?: string | number
  type: string
  content: React.ReactNode
  width?: string
  timeout?: number | null
  onClose?: (event?: React.MouseEventHandler<HTMLElement>) => void
}

interface INotifications {
  notifications: Array<INotification>
  placement: string
  defaultTimeout: number
  animationTimeout: number
  theme?: Theme
  duplicatePlaceholder?: React.ReactElement
}
```
