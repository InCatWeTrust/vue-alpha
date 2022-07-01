function fill (type) {
  let id = 1
  const obj = {
    data: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    type: type
  }

  obj.data.forEach(item => {
    item.id = id
    item.value = 'value ' + Math.floor(Math.random() * 1000)
    item.name = 'name ' + Math.floor(Math.random() * 10)
    id++
  })

  return obj
}

export default function () {
  const arr = []

  arr.push(fill('select'))
  arr.push(fill('radio'))
  arr.push({name: 'Наработка', type: 'input'})

  return arr
}
