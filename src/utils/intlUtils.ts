export function getWeekdays(locale: string, days: number = 7) {
  return Array.from({ length: days }, (_, day) =>
    new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(
      new Date(1970, 0, 5 + day), // 1970-01-05 is a Monday
    ),
  )
}
