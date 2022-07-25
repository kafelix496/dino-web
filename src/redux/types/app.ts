import { AlertColor } from '@/constants/app'
import type { ToastMessage } from '@/types'

export interface State {
  toastMessages: ToastMessage[]
}

export enum ActionType {
  ENQUEUE_ALERT = 'app/enqueueAlert',
  DELETE_ALERT = 'app/deleteAlert'
}

export interface enqueueAlertAction {
  type: ActionType.ENQUEUE_ALERT
  severity: AlertColor
  message: string
}

export interface deleteAlertAction {
  type: ActionType.DELETE_ALERT
  id: string
}

export type Action = enqueueAlertAction | deleteAlertAction
