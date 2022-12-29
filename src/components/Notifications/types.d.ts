import { Placement } from '../../types';
import { NotificationProps } from '../Notification/types';

type Animation = 'fade' | 'bounce' | 'zoom'
export interface NotificationsProps {
  notifications: Array<NotificationProps>
  animation?: Animation
  placement?: Placement
  defaultTimeout?: number
  animationTimeout?: number
  duplicatePlaceholder?: React.ReactElement | null
}

export type State = Required<NotificationsProps>
