/* eslint-disable no-console */
import chalk from 'chalk';

type Options = { type: string, script?: string, vars?: Array<string>, silent?: boolean }

export function error(options: Options): Error | void {
  const { type = 'unknown', script, vars = [], silent = false } = options;
  const definition = script ? ` from ${script}` : '';
  const err = { message: '', type };

  switch (type) {
    case 'general':
      err.message = `Error${definition}: ${vars[0]}`;
      break;
    case 'emitter':
      err.message = 'Expected listener to be a function';
      break;
    case 'duplicate':
      err.message = 'Existing instance of R1 Notifier found';
      break;
    default:
  }

  if (silent) {
    console.log(chalk.red.bold(err.message));
  } else {
    throw new Error(err.message);
  }
}
