export function DotEvery3Decimals(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
