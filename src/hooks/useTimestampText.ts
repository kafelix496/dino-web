import { useTranslation } from 'next-i18next'

import { convertTime } from '@/utils'

export const useCreatedAtText = (time: string): { createdAtText: string } => {
  const { t } = useTranslation('common')

  return { createdAtText: `${t('CREATED_AT')}: ${convertTime.dbToJs(time)}` }
}

export const useUpdatedAtText = (time: string): { updatedAtText: string } => {
  const { t } = useTranslation('common')

  return { updatedAtText: `${t('UPDATED_AT')}: ${convertTime.dbToJs(time)}` }
}
