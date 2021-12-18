import moment from 'moment'

export const dbToJs = (date: string) => {
  return moment(date).format('MM/DD/YYYY h:mm a')
}
