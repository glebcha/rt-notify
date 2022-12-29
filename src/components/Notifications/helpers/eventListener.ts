import { addNotification } from './addNotification';
import { removeNotification } from './removeNotification';
import { Action } from '../../../utils/types';
import { State } from '../types';

const actionHandlers = {
  add: addNotification,
  remove: removeNotification,
};
const noop = () => null;

export function eventsListener(
  setState: React.Dispatch<React.SetStateAction<State>>
): (action: Action) => (data: unknown) => void {
  return (action) => actionHandlers[action](setState) || noop;
}
