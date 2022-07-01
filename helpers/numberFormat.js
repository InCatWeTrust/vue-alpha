export default function numberFormat (value) {
  if (+value) {
    return new Intl.NumberFormat().format(value)
  } else {
    return value
  }
}
