export function fahrenheitToCelsius(temp: number) {
  return Math.floor((temp - 32) * 5 / 9);
}

export function celsiusToFahrenheit(temp: number) {
  return temp * 1.8 + 32
}

export function fahrenheitToCelsiusArr(temp: number[]) {
  return temp.map(value => fahrenheitToCelsius(value));
}
