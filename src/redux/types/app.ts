import { AlertColor } from '@/constants/app'
import type { ToastMessage } from '@/types'

export interface State {
  toastMessages: ToastMessage[]
  isSidebarNavOpen: boolean
  isSettingNavOpen: boolean
}

export enum ActionType {
  ENQUEUE_ALERT = 'app/enqueueAlert',
  DELETE_ALERT = 'app/deleteAlert',
  UPDATE_SIDEBAR_NAV_OPEN_STATUS = 'app/updateSidebarNavOpenStatus',
  TOGGLE_SIDEBAR_NAV_OPEN_STATUS = 'app/toggleSidebarNavOpenStatus',
  UPDATE_SETTING_NAV_OPEN_STATUS = 'app/updateSettingNavOpenStatus',
  TOGGLE_SETTING_NAV_OPEN_STATUS = 'app/toggleSettingNavOpenStatus'
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

export interface updateSidebarNavOpenStatusAction {
  type: ActionType.UPDATE_SIDEBAR_NAV_OPEN_STATUS
  status: boolean
}

export interface toggleSidebarNavOpenStatusAction {
  type: ActionType.TOGGLE_SIDEBAR_NAV_OPEN_STATUS
}

export interface updateSettingNavOpenStatusAction {
  type: ActionType.UPDATE_SETTING_NAV_OPEN_STATUS
  status: boolean
}

export interface toggleSettingNavOpenStatusAction {
  type: ActionType.TOGGLE_SETTING_NAV_OPEN_STATUS
}

export type Action =
  | enqueueAlertAction
  | deleteAlertAction
  | updateSidebarNavOpenStatusAction
  | toggleSidebarNavOpenStatusAction
  | updateSettingNavOpenStatusAction
  | toggleSettingNavOpenStatusAction
