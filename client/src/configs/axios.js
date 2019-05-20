import axios from 'axios'
import {apiConf} from './../config'
let baseConfig = {
  url: '/',
  method: 'post', // default
  baseURL: apiConf.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },

  params: {
    // ID: 12345,
  },
  data: {
    // firstName: 'Fred',
  },
  timeout: '',
  withCredentials: true, // default
  responseType: 'json', // default
  maxContentLength: 2000,

}

baseConfig = { ...baseConfig }

export const logup = async (data) => {
  const response = await axios({ ...baseConfig, data: data, url: apiConf.logup })
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('fetch failure')
  }
}

export const login = async (data) => {
  const response = await axios({ ...baseConfig, data: data, url: apiConf.login })
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('fetch failure')
  }
}

export const userList = async (data) => {
  const response = await axios({ ...baseConfig, data: data, url: apiConf.userlist, method: 'get' })
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('fetch failure')
  }
}

export const groupList = async (data) => {
  const response = await axios({ ...baseConfig, data, url: apiConf.grouplist, method: 'get' })
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('fetch failure')
  }
}

export const createGroup = async (data) => {
  const response = await axios({ ...baseConfig, url: apiConf.creategroup, data})
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('fetch failure')
  }
}

export const getMessageList = async (data) => {
  const response = await axios({ ...baseConfig, data: data, url: apiConf.messagelist, method: 'post' })
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('fetch failure')
  }
}
export const getGroupMessageList = async (data) => {
  const response = await axios({ ...baseConfig, url: apiConf.groupMessagelist+data.groupId, method: 'get' })
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error('fetch failure')
  }
}
