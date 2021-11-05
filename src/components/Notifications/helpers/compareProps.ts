import { default as equals } from "ramda/src/equals";
import { NotificationsProps } from "../types";

export const compareProps = (
  prev: NotificationsProps,
  next: NotificationsProps
): boolean => equals(next, prev);
