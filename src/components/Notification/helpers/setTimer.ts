import { Props, Timer } from '../types';

export function setTimer(props: Props, timer: Timer): void {
  const { id, remove, timeout, defaultTimeout, onClose } = props;

  if (timeout !== null) {
    timer.current = window.setTimeout(() => {
      remove(String(id));
      onClose && onClose();
    }, timeout || defaultTimeout);
  }
}
