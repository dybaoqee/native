import qs from 'qs'
import toCamelCase from 'camelcase-keys-deep'

import {API_URL} from '@/config/const'
import ResponseError from './ResponseError'

export const buildUrl = (path) => API_URL + path

export const buildHeaders = (jwt) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: jwt ? `Token ${jwt}` : undefined
})

export async function fetch(path, options = {}) {
  const finalOptions = {
    ...options,
    headers: Object.assign(buildHeaders(options.jwt), options.headers || {})
  }
  const response = await window.fetch(buildUrl(path), finalOptions)
  if (Math.floor(response.status / 100) === 2) {
    return response
  } else {
    let data
    const cType = response.headers.get('Content-Type')
    if (/application\/json/.test(cType))
      try {
        data = await response.json()
      } catch (_) {
        data = undefined
      }
    throw new ResponseError(response, data)
  }
}

export async function json(path, options) {
  const response = await fetch(path, options)
  if (response.status === 204) return null
  else return toCamelCase(await response.json())
}

export async function get(path, params, options) {
  const queryString = qs.stringify(params, {
    arrayFormat: 'brackets',
    encodeValuesOnly: true
  })
  return await json(`${path}?${queryString}`, options)
}

export async function post(path, params, options) {
  return await json(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export async function put(path, params, options) {
  return await json(path, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(params)
  })
}

export async function del(path, options) {
  return await fetch(path, {
    ...options,
    method: 'DELETE'
  })
}
