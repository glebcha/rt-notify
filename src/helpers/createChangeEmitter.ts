import { NotificationProps } from '../types'
import { logger } from '../helpers/logger'

type Action = 'add' | 'remove'

type Emitter = { 
  listen: (cb: (action: Action, notification?: NotificationProps) => void) => void, 
  emit: (action: Action, notification?: NotificationProps) => void 
}

export function createChangeEmitter(): Emitter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let listener = (action: Action, notification?: NotificationProps): void => {}

  function listen(cb: (action: Action, notification?: NotificationProps) => void): void {
    if (typeof cb !== 'function') {
      /* eslint-disable-next-line no-console */
      logger.error({ type: 'emitter' })
    }

    listener = cb
  }

  return { listen, emit: (action: Action, notification?: NotificationProps): void => listener(action, notification) }
}
