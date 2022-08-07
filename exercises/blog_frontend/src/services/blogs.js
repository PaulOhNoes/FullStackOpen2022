/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, objectId) => {
  const objectUrl = `${baseUrl}/${objectId}`
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(objectUrl, newObject, config)
  return response.data
}

const destroy = async (objectId) => {
  const objectUrl = `${baseUrl}/${objectId}`
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(objectUrl, config)

  return response.data
}


export default { getAll, create, setToken, update, destroy }