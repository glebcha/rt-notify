import findIndex from '@bit/ramda.ramda.find-index';
import { State } from '../types';
import { NotificationProps } from '../../../types';



export function removeNotification(setState: React.Dispatch<React.SetStateAction<State>>): (id: string) => void {
  return (id): void => setState(state => {
    const { notifications } = state;
    const getIndex = (id: string, data: Array<NotificationProps>): number => findIndex(item => String(item.id) === id, data);
    const notificationIndex = getIndex(id, notifications);

    notifications.splice(notificationIndex, 1);

    return { ...state, notifications };
  });
}
