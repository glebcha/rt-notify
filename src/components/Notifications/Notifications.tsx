import * as React from 'react';
import cn from 'classnames';
import equals from '@bit/ramda.ramda.equals';
import findIndex from '@bit/ramda.ramda.find-index';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Notification } from '../Notification/Notification';
import { hash, logger, createChangeEmitter } from '../../helpers';
import { NotificationProps, NotificationsProps } from '../../types';
import styles from './Notifications.css';
import '../../styles/global.css';

type State = Required<NotificationsProps>

export const eventEmitter = createChangeEmitter();

const defaultProps: Required<NotificationsProps> = {
  animation: 'fade',
  notifications: [],
  placement: 'right',
  defaultTimeout: 1500,
  duplicatePlaceholder: null,
};
const globalState: {
  id: string | null
  inited: boolean
} = {
  id: null,
  inited: false,
};

abstract class BaseNotifications extends React.Component<NotificationsProps, State> {
  state: State = defaultProps
  globalId?: string | null

  constructor(props: NotificationsProps) {
    super(props);

    const globalId = hash();
    
    this.globalId = globalId;

    if (!globalState.inited) {
      globalState.inited = true;
      globalState.id = globalId;
      this.state.notifications = props.notifications || [];
    } else {
      logger.error({ type: 'duplicate', silent: true });
    }
  }
  abstract addNotification(notification: NotificationProps): void
  abstract removeNotification(id: string): void
}

export class Notifications extends BaseNotifications {
  get isValid(): boolean {
    const isValid = this.globalId === globalState.id;

    return isValid;
  }

  componentDidMount(): void {
    this.isValid && 
    eventEmitter.listen((action, notification) => {
      switch (action) {
        case 'add':
          notification && this.addNotification(notification);
          break;
        case 'remove':
          notification && this.removeNotification(String(notification.id));
          break; 
        default:
          break;
      }
    });
  }

  static getDerivedStateFromProps(nextProps: NotificationsProps, state: State): State | null {
    const props= { ...defaultProps, ...nextProps};
    const isNotChanged = props.notifications && equals(props, state);

    return isNotChanged ? null : props;
  }

  addNotification = (notification: NotificationProps): void => {
    this.setState((state, props) => {
      const { placement } = props;
      const { notifications } = state;
      const { id = hash() } = notification;
      
      if ( placement === 'top') {
        notifications.push({ id, ...notification });
      } else {
        notifications.unshift({ id, ...notification });
      }

      return { ...state, notifications };
    });
  }

  removeNotification = (id: string): void => {
    this.setState(state => {
      const { notifications } = state;
      const getIndex = (id: string, data: Array<NotificationProps>): number => findIndex(item => String(item.id) === id, data);
      const notificationIndex = getIndex(id, notifications);

      notifications.splice(notificationIndex, 1);

      return { ...state, notifications };
     });
  }

  render(): React.ReactNode {
    const { 
      placement, 
      animation,
      notifications,
      defaultTimeout, 
      duplicatePlaceholder,
    } = this.state;
    const position = placement.replace(/./,x=>x.toUpperCase());
    const animationVariables: Record<string, string> = {
      '--rt-notify-in-animation': `${animation}In${position}`,
      '--rt-notify-out-animation': `${animation}Out${position}`,
    };

    return (
      this.isValid ? (
        <div
          style={animationVariables} 
          className={cn('rt-notify-root', placement, styles.wrapper)}
        >
          <TransitionGroup>
            {notifications.map(notification => {
              const { id, type, timeout, content, width, onClose } = notification;

              return notification && (
                <CSSTransition key={id} timeout={500} classNames="rt-notify">
                  <Notification
                    id={id}
                    type={type}
                    width={width}
                    placement={placement}
                    remove={this.removeNotification}
                    timeout={timeout}
                    content={content}
                    defaultTimeout={defaultTimeout}
                    onClose={onClose}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      ) : duplicatePlaceholder
    );
  }
}
