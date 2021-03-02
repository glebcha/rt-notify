import { default as findIndex } from 'ramda/src/findIndex';
import { State } from '../types';
import { NotificationProps } from '../../Notification/types';



export function removeNotification(setState: React.Dispatch<React.SetStateAction<State>>): (id: string) => void {
  return (id): void => setState(state => {
    const { notifications } = state;
    const getIndex = (id: string, data: Array<NotificationProps>): number => findIndex(item => String(item.id) === id, data);
    const notificationIndex = getIndex(id, notifications);

    notifications.splice(notificationIndex, 1);

    return { ...state, notifications };
  });
}
