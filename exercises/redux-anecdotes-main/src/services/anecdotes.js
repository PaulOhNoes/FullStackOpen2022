import axios from "axios"
import { getId } from "../reducers/anecdoteReducer"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const obj = {content, id: getId(), votes: 0}
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const update = async (obj) => {
  const response = await axios.put(`${baseUrl}/${obj.id}`, obj)
  return response.data
}

export default { getAll, create, update }