// Список инпутов на странице check
// input-value - текст, который отображается внутри инпута и при фокусе переносится над инпутом
// title - текст над инпутом
// slug - ключ для отправки параметров на backend
// placeholder - placeholder инпута
// mask или valid, одно из двух значений
// mask - строка вида '###-###-###', где # - количество чисел разделяемых определенным символом
// накладывает маску на инпут
// valid - строка вида 'aA9' - где a - латинские буквы в нижнем регистре
// A - латинские буквы в верхнем регистре
// 9 - цифры
// накладывает на инпут валидацию, соответственно переданной строке
// length - опциональный параметр, передается вместе с valid, ограничивает длину ввода инпута
// до заданного значения

export default [
  {
    id: 1,
    input_title: 'VIN',
    title: 'VIN',
    slug: 'vin'
  },
  {
    id: 2,
    input_title: 'ИНН',
    title: 'ИНН',
    slug: 'inn'
  },
  {
    id: 3,
    input_title: 'ОГРН',
    title: 'ОГРН',
    slug: 'ogrn'
  },
  {
    id: 4,
    input_title: 'Серия ПСМ',
    title: 'Серия ПСМ',
    slug: 'psm_seria',
    placeholder: 'AA',
    valid: 'A',
    length: 2
  },
  {
    id: 5,
    input_title: 'Номер ПСМ',
    title: 'Номер ПСМ',
    slug: 'psm_number',
    valid: '9',
    length: 6,
    placeholder: '123456'
  },
  {
    id: 6,
    input_title: 'Дата выдачи ПСМ',
    title: 'Дата выдачи ПСМ',
    slug: 'psm_date',
    mask: '##.##.####',
    placeholder: '__.__.____'
  },
  {
    id: 7,
    input_title: 'Cимвол государственной принадлежности',
    title: 'Символ государственной принадлежности (при наличии)',
    slug: 'psm_symbol',
    valid: 'A',
    placeholder: 'RU',
    length: 2
  },
  {
    id: 8,
    input_title: 'Серия ГРЗ',
    title: 'Серия ГРЗ',
    slug: 'grz_seria',
    valid: 'A',
    length: 2,
    placeholder: 'AA'
  },
  {
    id: 9,
    input_title: 'Номер ГРЗ',
    title: 'Номер ГРЗ',
    slug: 'grz_number',
    valid: '9',
    length: 4,
    placeholder: '1234'
  },
  {
    id: 10,
    input_title: 'Код региона ГРЗ',
    title: 'Код региона ГРЗ',
    slug: 'grz_code',
    valid: '9',
    length: 2,
    placeholder: '01'
  },
  {
    id: 11,
    input_title: 'Заводской номер машины (рамы) или часть номера',
    title: 'Заводской номер машины (рамы) или часть номера',
    slug: 'vehicle_number',
    placeholder: '1ab235'
  },
  {
    id: 12,
    input_title: 'Номер двигателя',
    title: 'Номер двигателя',
    slug: 'engine_number',
    placeholder: '1ab235'
  },
  {
    id: 13,
    input_title: 'Серия свидетельства о регистрации',
    title: 'Серия свидетельства о регистрации',
    slug: 'certificate_seria',
    valid: 'A',
    length: 2,
    placeholder: 'AA'
  },
  {
    id: 14,
    input_title: 'Номер свидетельства о регистрации',
    title: 'Номер свидетельства о регистрации',
    slug: 'certificate_number',
    valid: '9',
    length: 6,
    placeholder: '123456'
  },
  {
    id: 15,
    input_title: 'Дата выдачи свидетельства о регистрации',
    title: 'Дата выдачи свидетельства о регистрации',
    slug: 'certificate_date',
    mask: '##.##.####',
    placeholder: '__.__.____'
  },
  {
    id: 16,
    input_title: 'Номер уведомления',
    title: 'Регистрационный номер уведомления',
    slug: 'notification_number',
    mask: '###-####-######-###',
    placeholder: '___-____-______-___'
  }
]
