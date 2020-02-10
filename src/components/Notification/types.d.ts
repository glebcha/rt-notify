import { NotificationProps, Theme, Placement } from '../../types';

export interface Props extends NotificationProps {
  width?: string
  theme?: Theme
  placement: Placement
  defaultTimeout: number
  remove: (id: string) => void
  onClose?: NotificationProps['onClose']
}

export type Timer = React.MutableRefObject<number | null>
