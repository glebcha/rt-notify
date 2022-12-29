import { hash } from '../../../utils';
import { State } from '../types';
import { NotificationProps } from '../../Notification/types';

export function addNotification (
  setState: React.Dispatch<React.SetStateAction<State>>
): (notification: unknown) => void {
  return (notification: unknown): void => {
    const isObject = notification === Object(notification);

    if (isObject) {
      setState(state => {
        const { notifications, placement } = state;
        const { id = hash() } = notification as NotificationProps;
        const newNotification = { id, ...(notification as NotificationProps) };
        const insertMethod = placement === 'top' ? 'push' : 'unshift';
    
        notifications[insertMethod](newNotification);
    
        return { ...state, notifications };
      });
    }
  };
}
