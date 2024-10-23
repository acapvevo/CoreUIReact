import { DateTime, ToISOTimeOptions } from 'luxon'

export const formatFromISO = (iso: string, format: string = '') => {
  if (!format) format = 'F'
  const datetime = DateTime.fromISO(iso)

  return datetime.toFormat(format)
}

export const isoToJSDate = (iso: string) => {
  return DateTime.fromISO(iso).toJSDate()
}

export const getStartDateForFilter = () => {
  return DateTime.local().minus({ days: 1 }).startOf('day').toJSDate()
}

export const getEndDateForFilter = () => {
  return DateTime.local().endOf('day').set({ millisecond: 0, second: 0 }).toJSDate()
}

export const formatFromJSDate = (date: Date, format: string) => {
  return DateTime.fromJSDate(date).toFormat(format)
}

export const formatForDateTimeLocalInput = (date: Date) => {
  return DateTime.fromJSDate(date).set({millisecond: 0, second: 0}).toISO({
    includeOffset: false,
    suppressSeconds: true,
    suppressMilliseconds: true,
  })!
}

const getDateTimeNow = ({}: ToISOTimeOptions) => {
  return
}

export const formatForDateTimeLocalInputFromString = (date?: string) => {
  let dateTime: DateTime<boolean> = DateTime.now()
  if (date) dateTime = DateTime.fromISO(date)

  return formatForDateTimeLocalInput(dateTime.toJSDate())
}

export const getLocalTimezone = (format: string) => {
  return DateTime.local().toFormat(format)
}
