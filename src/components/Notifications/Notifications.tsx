import * as React from 'react';
import clsx from 'clsx';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Notification } from '../Notification/Notification';
import { hash, logger, createChangeEmitter } from '../../utils';

import { compareProps } from './helpers/compareProps';
import { eventsListener } from './helpers/eventListener';
import { removeNotification } from './helpers/removeNotification';

import { State, NotificationsProps } from './types';
import { Emitter } from '../../utils/types';

import styles from './Notifications.css';
import '../../styles/global.css';

export const eventEmitter: Emitter = createChangeEmitter();

const defaultProps: Required<NotificationsProps> = {
  animation: 'fade',
  notifications: [],
  placement: 'right',
  defaultTimeout: 1500,
  duplicatePlaceholder: null,
};

export const Notifications: React.FC<NotificationsProps> = React.memo(props => {
  const [isValid, setValid] = React.useState(false);
  const [state, setState] = React.useState<State>({...defaultProps, ...props});
  const { 
    placement, 
    animation,
    notifications,
    defaultTimeout, 
    duplicatePlaceholder,
  } = state;
  const position = placement.replace(/./,x=>x.toUpperCase());
  const animationVariables: Record<string, string> = {
    '--rt-notify-in-animation': `${String(animation)}In${position}`,
    '--rt-notify-out-animation': `${String(animation)}Out${position}`,
  };

  React.useEffect(() => {
    const instanceId = hash();
    const { instances, inited } = eventEmitter.register(instanceId);
    const isValid = inited && instances.length === 1;

    if (isValid) {
      setValid(true);
      eventEmitter.listen(eventsListener(setState));
    } else {
      setValid(false);
      logger.error({ type: 'duplicate', silent: true });
    }

  }, []);

  React.useEffect(() => {
    setState({...defaultProps, ...props});
  }, [props]);

  return (
    isValid ? (
      <div
        style={animationVariables} 
        className={clsx('rt-notify-root', placement, styles.root)}
      >
        <TransitionGroup className={styles.wrapper}>
          {notifications.map(notification => {
            const { id, type, timeout, content, width, onClose } = notification;

            return notification && (
              <CSSTransition key={id} timeout={500} classNames="rt-notify">
                <Notification
                  id={id}
                  type={type}
                  width={width}
                  placement={placement}
                  remove={removeNotification(setState)}
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
}, compareProps);
