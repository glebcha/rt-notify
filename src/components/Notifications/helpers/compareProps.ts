import equals from '@bit/ramda.ramda.equals';
import { NotificationsProps } from '../../../types';

export const compareProps = (prev: NotificationsProps, next: NotificationsProps): boolean => equals(next, prev);
