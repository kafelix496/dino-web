import type { ToastMessage } from '@/types'

export interface State {
  toastMessages: ToastMessage[]
}

export enum ActionType {
  ENQUEUE_ALERT = 'app/enqueueAlert'
}

export interface enqueueAlertAction {
  type: ActionType.ENQUEUE_ALERT
  severity: string
  message: string
}

export type Action = enqueueAlertAction
