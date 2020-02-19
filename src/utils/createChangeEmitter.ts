import { NotificationProps } from '../types';
import { logger } from './logger';

export type Action = 'add' | 'remove'

interface Register { 
  instances: Array<string>, 
  inited: boolean
}

export interface Emitter { 
  listen: (cb: (action: Action, notification?: NotificationProps) => void) => void, 
  emit: (action: Action, notification?: NotificationProps) => void, 
  register: (id: Register['instances'][number]) => Register
}

export function createChangeEmitter(): Emitter {
  const instances: Register['instances'] = [];
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

  function register(id: Register['instances'][number]): Register {
    const inited = !instances.includes(id);

    inited && instances.push(id);

    return { instances, inited };
  }

  return { listen, emit, register };
}
