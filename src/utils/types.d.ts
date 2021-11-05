import { NotificationProps } from "../components/Notification/types";

type ListenCallback = (
  action: Action,
  notification?: NotificationProps
) => void;

export type Action = "add" | "remove";

interface Register {
  instances: Array<string>;
  inited: boolean;
}

export interface Emitter {
  listen: (cb: ListenCallback) => void;
  emit: (action: Action, notification?: NotificationProps) => void;
  register: (id: Register["instances"][number]) => Register;
}
