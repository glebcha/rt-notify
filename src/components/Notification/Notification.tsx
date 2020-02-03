import * as React from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
import { NotificationProps, Theme, Placement } from '../../types';
import styles from './Notification.css';

interface Props extends NotificationProps {
  width?: string
  theme?: Theme
  placement: Placement
  defaultTimeout: number
  remove: (id: string) => void
  onClose?: NotificationProps['onClose']
}

abstract class BaseNotification extends React.Component<Props> {
  protected timer?: ReturnType<typeof setTimeout>
  
  protected abstract setTimer(): void
  protected abstract onClose(): void

  protected clearTimer = (): void => {
    this.timer && clearTimeout(this.timer);
  }

  protected onMouseOver = (): void => this.clearTimer()

  protected onMouseOut = (): void => {
    this.setTimer();
  }
}

export class Notification extends BaseNotification {    
  componentDidMount(): void {
    this.setTimer();
  }

  componentWillUnmount(): void {
    this.clearTimer();
  }

  setTimer = (): void => {
    const { id, remove, timeout, defaultTimeout, onClose } = this.props;

    if (timeout !== null) {
      this.timer = setTimeout(() => {
        remove(String(id));
        onClose && onClose();
      }, timeout || defaultTimeout);
    }
  }

  onClose = (): void => {
    const { id, remove, onClose } = this.props;

    remove(String(id));
    onClose && onClose();
  }

  render(): React.ReactNode {
    const {
      width = 'auto',
      type = 'success',
      content = 'Sample Notifier',
      placement,
    } = this.props;
    const notificationVariables = { 
      ['--t-notify-width' as string]: width, 
    };

    return (
      <div
        style={notificationVariables}
        className={cn(styles.wrapper, placement, type)}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div data-icontype={type} className={styles.icon}>
          <Icon fill='#fff' width='32' viewBox='0 0 500 500' name={type} />
        </div>
        <div className={styles.content}>
          <span data-texttype={type}>{content}</span>
        </div>
        <div className={styles.close}>
          <Icon fill='#a1a9b2' width='24' viewBox='0 0 500 500' name="cross" onClick={this.onClose} />
        </div>
      </div>
    );
  }
}
