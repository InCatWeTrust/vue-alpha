// Поля:
// text - Название таба
// svg - Адрес svg картинки для тега use
// link - ссылка на страницу
// user_access_role - Роль юзера, с которой ему будет доступна страница

export default [
  {
    id: 1,
    text: 'Поиск',
    svg: '/img/sprites.svg#search',
    link: 'search',
    user_access_role: 1
  },
  {
    id: 2,
    text: 'Проверки',
    svg: '/img/check.svg#check',
    link: 'check',
    user_access_role: 1
  },
  {
    id: 3,
    text: 'Гараж',
    svg: '/img/garage.svg#garage',
    link: 'garage',
    user_access_role: 1
  },
  {
      id: 4,
      text: 'Сервисные мануалы',
      svg: '/img/pdf.svg#pdf',
      link: 'manual',
      user_access_role: 1
  }
]
