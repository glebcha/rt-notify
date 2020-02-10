import { NotificationsProps } from '../../types';

export type State = Required<NotificationsProps>
export interface GlobalState {
  id: string | null
  inited: boolean
}
