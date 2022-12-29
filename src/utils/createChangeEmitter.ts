import { Emitter, Action, Register, Listener } from './types';
import { logger } from './logger';

export function createChangeEmitter(): Emitter {
  const instances: Register['instances'] = [];

  let listener = (
    _action: Parameters<Listener>[0], 
  ) => {
     return (_data?: unknown) => {
      /* noop */
     };
  };

  function listen(cb: Listener): void {
    if (typeof cb !== 'function') {
      logger.error({ type: 'emitter' });
    }

    listener = cb;
  }

  function emit(action: Action) { 
    return listener(action); 
  }

  function register(id: Register['instances'][number]): Register {
    const inited = !instances.includes(id);

    inited && instances.push(id);

    return { instances, inited };
  }

  return { listen, emit, register };
}
