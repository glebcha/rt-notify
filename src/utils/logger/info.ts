/* eslint-disable @typescript-eslint/explicit-function-return-type */
type Options = { type?: string; message: string };

const { log, info, warn } = console;

export function infoLogger(options: Options): void {
  const { type = "info", message } = options;
  let result = () => log(message);

  switch (type) {
    case "info":
      result = () => info(message);
      break;
    case "success":
      result = () => log(message);
      break;
    case "warning":
      result = () => warn(message);
      break;
    default:
  }

  result();
}
