import { Error } from './Error'
import { Success } from './Success'
import { Waiting } from './Waiting'
import { Cross } from './Cross'

declare interface Icons {
  [id: string]: React.ElementType
}

export const icons: Icons = {
  success: Success,
  waiting: Waiting,
  error: Error,
  cross: Cross,
}