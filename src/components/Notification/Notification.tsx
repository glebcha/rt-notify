import * as React from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import { setTimer } from './helpers/setTimer';
import { clearTimer } from './helpers/clearTimer';
import { handleClose } from './helpers/handleClose';

import { Props, Timer } from './types';

import styles from './Notification.css';

export const Notification: React.FC<Props> = props => {
  const {
    width = 'auto',
    type = 'success',
    content = 'Sample Notifier',
    placement,
  } = props;
  const timer: Timer = React.useRef(null);
  const onClick = handleClose(props);
  const onMouseOver = (): void => clearTimer(timer);
  const onMouseOut = (): void => setTimer(props, timer);
  const notificationVariables = { 
    ['--rt-notify-width' as string]: width, 
  };

  React.useEffect(() => {
    setTimer(props, timer);

    return (): void => clearTimer(timer);
  }, []);

  return (
    <div
      style={notificationVariables}
      className={cn(styles.wrapper, placement, type)}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div data-icontype={type} className={styles.icon}>
        <Icon fill='#fff' width='32' viewBox='0 0 500 500' name={type} />
      </div>
      <div data-texttype={type} className={styles.content}>
        {content}
      </div>
      <div className={styles.close}>
        <Icon fill='#a1a9b2' width='35' viewBox='0 0 500 500' name="cross" onClick={onClick} />
      </div>
    </div>
  );
};
