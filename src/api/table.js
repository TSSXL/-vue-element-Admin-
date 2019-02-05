import fetch from './fetch.js'

export function getList() {
  return fetch({
    url: '/ts',
    method: 'get'
  })
}
