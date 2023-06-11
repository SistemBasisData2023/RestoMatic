export function Round2Decimal(value: number): number {
  return Math.round(value * 100) / 100
}

export function FormatTime(value: Date): string {
  const date = addHours(new Date(value), 7)
  const year = date.getFullYear()
  const month = date.toLocaleString('en-US', { month: 'short' })
  const day = date.getDate()
  const hours = date.toLocaleString('en-US', {
    hour: '2-digit',
    hourCycle: 'h24',
    hour12: false,
  })
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  const formatTime = `${day} ${month} ${year}, ${hours}:${minutes}`
  return formatTime
}

function addHours(date: Date, hours: number) {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000)
  return date
}
