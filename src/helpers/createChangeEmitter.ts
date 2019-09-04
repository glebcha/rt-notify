import { INotification } from "../types"
import { logger } from '../helpers'

type Action = 'add' | 'remove'

export function createChangeEmitter() {
  let listener = (action: Action, notification?: INotification) => {}

  function listen(cb: (action: Action, notification?: INotification) => void) {
    if (typeof cb !== 'function') {
      /* eslint-disable-next-line no-console */
      logger.error({ type: 'emitter' })
    }

    listener = cb
  }

  return { listen, emit: (action: Action, notification?: INotification) => listener(action, notification) }
}
