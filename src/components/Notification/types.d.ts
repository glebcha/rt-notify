import { Theme, Placement, Status } from "../../types";

export interface NotificationProps {
  id?: string | number;
  type?: Status;
  content: React.ReactNode;
  width?: string;
  timeout?: number | null;
  onClose?: (event?: React.MouseEventHandler<HTMLElement>) => void;
}
export interface Props extends NotificationProps {
  width?: string;
  theme?: Theme;
  placement: Placement;
  defaultTimeout: number;
  remove: (id: string) => void;
  onClose?: NotificationProps["onClose"];
}

export type Timer = React.MutableRefObject<number | null>;
