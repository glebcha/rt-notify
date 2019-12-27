import { NotificationProps } from '../types';
import { logger } from '../helpers/logger';

type Action = 'add' | 'remove'

export type Emitter = { 
  listen: (cb: (action: Action, notification?: NotificationProps) => void) => void, 
  emit: (action: Action, notification?: NotificationProps) => void 
}

export function createChangeEmitter(): Emitter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let listener = (action: Action, notification?: NotificationProps): void => {};

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
