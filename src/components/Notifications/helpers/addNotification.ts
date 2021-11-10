import { hash } from "../../../utils";
import { State } from "../types";
import { NotificationProps } from "../../Notification/types";

export function addNotification(
  setState: React.Dispatch<React.SetStateAction<State>>
): (notification: NotificationProps) => void {
  return (notification): void =>
    setState((state) => {
      const { notifications, placement } = state;
      const { id = hash() } = notification;

      if (placement === "top") {
        notifications.push({ id, ...notification });
      } else {
        notifications.unshift({ id, ...notification });
      }

      return { ...state, notifications };
    });
}
