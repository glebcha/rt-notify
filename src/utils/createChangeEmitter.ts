import { NotificationProps } from '../types';
import { logger } from '../helpers/logger';

export type Action = 'add' | 'remove'

export interface Emitter { 
  listen: (cb: (action: Action, notification?: NotificationProps) => void) => void, 
  emit: (action: Action, notification?: NotificationProps) => void 
}

export function createChangeEmitter(): Emitter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let listener = (action: Action, notification?: NotificationProps): void => {
    //empty
  };

  function listen(cb: (action: Action, notification?: NotificationProps) => void): void {
    if (typeof cb !== 'function') {
      logger.error({ type: 'emitter' });
    }

    listener = cb;
  }

  function emit(action: Action, notification?: NotificationProps): void { 
    return listener(action, notification); 
  }

  return { listen, emit };
}
