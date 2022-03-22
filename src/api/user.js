import request from '../utils/axios'

//获取签名随机数据
export function getSignData (params){
    return request({
      url: '/user/RegisterLogin/getSignData',
      method: 'post',
      params,
    })
}

export function tokenData (params){
  return request({
    url: '/homepage/tokenData',
    method: 'get',
    params,
  })
}

export function overView (params){
  return request({
    url: '/homepage/overView',
    method: 'get',
    params,
  })
}

export function getUser (params){
  return request({
    url: '/user/getUser',
    method: 'get',
    params,
  })
}

//获取资产流水记录
export function assetJR (data){
  return request({
    url: '/homepage/assetJR',
    method: 'POST',
    data,
  })
}

//贡献页用户详情
export function getUserData (data){
  return request({
    url: '/user/getUserData',
    method: 'POST',
    data,
  })
}

// 获取下级列表

export function getMembers (data){
  return request({
    url: '/user/getMembers',
    method: 'POST',
    data,
  })
}

