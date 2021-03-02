import { Placement } from '../../types';
import { NotificationProps } from '../Notification/types';
export interface NotificationsProps {
  notifications: Array<NotificationProps>
  animation?: Animation | string
  placement?: Placement
  defaultTimeout?: number
  duplicatePlaceholder?: React.ReactElement | null
}

export type State = Required<NotificationsProps>
