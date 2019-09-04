/* eslint-disable no-console */
import chalk from 'chalk'

type Options = { type?: string, message: string }

export function info(options: Options) {
  const { type = 'info', message } = options
  let result = ''

  switch (type) {
    case 'info':
      result = chalk.grey.bold(message)
      break
    case 'success':
      result = chalk.green.bold(message)
      break
    case 'warning':
      result = chalk.yellow.bold(message)
      break
    default:
  }

  console.log(result)
}
