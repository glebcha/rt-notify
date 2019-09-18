import * as React from 'react'
import * as R from 'ramda'
import { ThemeProvider } from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Notification } from './Notification'
import { NotificationsWrapper } from './NotificationsWrapper'
import { hash, logger, createChangeEmitter } from '../helpers'
import { theme as defaultTheme } from '../theme'
import { INotifications, INotification } from '../types'

type State = {
  notifications: Array<INotification>
}

export const eventEmitter = createChangeEmitter()
const defaultProps = {
  notifications: [],
  placement: 'right',
  defaultTimeout: 1500,
  animationTimeout: 300,
}
const globalState: {
  id: string | null
  inited: boolean
} = {
  id: null,
  inited: false,
}

export class Notifications extends React.Component<INotifications, State> {
  constructor(props: INotifications) {
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

  static defaultProps = defaultProps

  globalId: string | null = null

  state: State = {
    notifications: [],
  }

  get isValid() {
    const isValid = this.globalId === globalState.id

    return isValid
  }

  componentDidMount() {
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

  static getDerivedStateFromProps(nextProps: INotifications, state: State): State | null {
    const { notifications } = nextProps
    const isNotChanged = notifications && R.equals(notifications, state.notifications)

    if (!isNotChanged) {
      return { notifications }
    }

    return null
  }

  addNotification = (notification: INotification) => {
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

  removeNotification = (id: string) => {
    this.setState(state => {
      const { notifications } = state
      const findIndex = (id: string, data: Array<INotification>) => R.findIndex(item => String(item.id) === id, data);
      const notificationIndex = findIndex(id, notifications)

      notifications.splice(notificationIndex, 1)

      return { ...state, notifications }
     })
  }

  render() {
    const { 
      placement = 'right', 
      theme = {}, 
      defaultTimeout, 
      animationTimeout, 
      duplicatePlaceholder = null
    } = this.props
    const { notifications } = this.state
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
