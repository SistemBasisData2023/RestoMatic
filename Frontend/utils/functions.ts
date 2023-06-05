export function DotEvery3Decimals(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
