import { Error } from './Error';
import { Success } from './Success';
import { Waiting } from './Waiting';
import { Cross } from './Cross';
import { IconProps } from './types';

declare interface Icons {
  [id: string]: React.SFC<IconProps>
}

export const icons: Icons = {
  success: Success,
  waiting: Waiting,
  error: Error,
  cross: Cross,
};