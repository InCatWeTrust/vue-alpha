const auth = {
  logged_in: false,
  role: 0,
  loaded: false
}

export const changeUser = function ({ loggedIn = false, role = 0 }) {
  auth.logged_in = loggedIn || false
  auth.role = role || 0
  auth.loaded = true
}

export const userLoaded = function () {
  auth.loaded = true
}

export default auth
