import * as React from 'react'
import * as R from 'ramda'
import { ThemeProvider } from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Notification } from './Notification'
import { NotificationsWrapper } from './NotificationsWrapper'
import { hash, logger, createChangeEmitter } from '../helpers'
import { theme as defaultTheme } from '../theme'
import { NotificationProps, NotificationsProps } from '../types'

type State = Required<NotificationsProps>

export const eventEmitter = createChangeEmitter()

const defaultProps: Required<NotificationsProps> = {
  theme: defaultTheme,
  notifications: [],
  placement: 'right',
  defaultTimeout: 1500,
  animationTimeout: 300,
  duplicatePlaceholder: null,
}
const globalState: {
  id: string | null
  inited: boolean
} = {
  id: null,
  inited: false,
}

abstract class BaseNotifications extends React.Component<NotificationsProps, State> {
  state: State = defaultProps
  globalId?: string | null

  constructor(props: NotificationsProps) {
    super(props)

    const globalId = hash()
    
    this.globalId = globalId

    if (!globalState.inited) {
      globalState.inited = true
      globalState.id = globalId
      this.state.notifications = props.notifications || []
    } else {
      logger.error({ type: 'duplicate', silent: true })
    }
  }
  abstract addNotification(notification: NotificationProps): void
  abstract removeNotification(id: string): void
}

export class Notifications extends BaseNotifications {
  get isValid(): boolean {
    const isValid = this.globalId === globalState.id

    return isValid
  }

  componentDidMount(): void {
    this.isValid && 
    eventEmitter.listen((action, notification) => {
      switch (action) {
        case 'add':
          notification && this.addNotification(notification)
          break
        case 'remove':
          notification && this.removeNotification(String(notification.id))
          break 
        default:
          break
      }
    })
  }

  static getDerivedStateFromProps(nextProps: NotificationsProps, state: State): State | null {
    const props= { ...defaultProps, ...nextProps}
    const isNotChanged = props.notifications && R.equals(props, state)

    return isNotChanged ? null : props
  }

  addNotification = (notification: NotificationProps): void => {
    this.setState((state, props) => {
      const { placement } = props
      const { notifications } = state
      const { id = hash() } = notification
      
      if ( placement === 'top') {
        notifications.push({ id, ...notification })
      } else {
        notifications.unshift({ id, ...notification })
      }

      return { ...state, notifications }
    })
  }

  removeNotification = (id: string): void => {
    this.setState(state => {
      const { notifications } = state
      const findIndex = (id: string, data: Array<NotificationProps>): number => R.findIndex(item => String(item.id) === id, data);
      const notificationIndex = findIndex(id, notifications)

      notifications.splice(notificationIndex, 1)

      return { ...state, notifications }
     })
  }

  render(): React.ReactNode {
    const { 
      placement, 
      theme, 
      notifications,
      defaultTimeout, 
      animationTimeout, 
      duplicatePlaceholder,
    } = this.state
    const customTheme = R.mergeDeepRight(defaultTheme, theme)

    return (
      this.isValid ? (
        <ThemeProvider theme={customTheme}>
          <NotificationsWrapper 
            placement={placement}
            className={`rt-notify ${placement}`} 
          >
            <TransitionGroup component={null}>
              {notifications.map(notification => {
                const { id, type, timeout, content, width, onClose } = notification

                return notification && (
                  <CSSTransition key={id} timeout={animationTimeout} classNames="notification">
                    <Notification
                      id={id}
                      type={type}
                      width={width}
                      placement={placement}
                      animationTimeout={animationTimeout}
                      remove={this.removeNotification}
                      timeout={timeout}
                      content={content}
                      defaultTimeout={defaultTimeout}
                      onClose={onClose}
                    />
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
          </NotificationsWrapper>
        </ThemeProvider>
      ) : duplicatePlaceholder
    )
  }
}
