import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
// 人员，部门，患者和域ID页面
// 带data请求
export const hipMasterPost = data => {
  return axios.request({
    url: data.url,
    headers: {
      'Content-type': 'application/json'
    },
    data: data.payLoad,
    method: 'post'
  })
}
// 不带带data请求
export const hipMasterGet = url => {
  return axios.request({
    url: url,
    headers: {
      'Content-type': 'application/json'
    },
    method: 'post'
  })
}
