import { useTranslation } from 'next-i18next'

import { convertTime } from '@/utils'

export const useCreatedAtText = (time: string): string => {
  const { t } = useTranslation('common')

  return `${t('CREATED_AT')}: ${convertTime.dbToJs(time)}`
}

export const useUpdatedAtText = (time: string): string => {
  const { t } = useTranslation('common')

  return `${t('UPDATED_AT')}: ${convertTime.dbToJs(time)}`
}
