export type Listener = (action: Action) => (data?: unknown) => void;

export type Action = 'add' | 'remove'

interface Register { 
  instances: Array<string>, 
  inited: boolean
}

export interface Emitter { 
  listen: (cb: Listener) => void, 
  emit: Listener, 
  register: (id: Register['instances'][number]) => Register
}