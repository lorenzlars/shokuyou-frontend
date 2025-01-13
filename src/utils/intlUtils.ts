export function getWeekdays(locale: string) {
  return Array.from({ length: 7 }, (_, day) =>
    new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(
      new Date(1970, 0, 5 + day), // 1970-01-05 is a Monday
    ),
  )
}
