import { Timer } from '../types';

export function clearTimer(timer: Timer): void {
  timer.current && clearTimeout(timer.current);
}
