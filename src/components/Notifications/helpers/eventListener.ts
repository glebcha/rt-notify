import { addNotification } from './addNotification';
import { removeNotification } from './removeNotification';
import { State } from '../types';
import { NotificationProps } from '../../Notification/types';
import { Action } from '../../../utils/types';

export function eventsListener(
  setState: React.Dispatch<React.SetStateAction<State>>
): (action: Action, notification?: NotificationProps) => void {
  const add = addNotification(setState);
  const remove = removeNotification(setState);

  return (action, notification): void => {
    switch (action) {
      case 'add':
        notification && add(notification);
        break;
      case 'remove':
        notification && remove(String(notification.id));
        break; 
      default:
        break;
    }
  };
}
