import request from '@/utils/request'

export function upload_model(data) {
  return request({
    url: 'http://127.0.0.1:8000/upload/model',
    method: 'post',
    data
  })
}

export function all_models() {
  return request({
    url: 'http://127.0.0.1:8000/upload/all',
    method: 'get',
  })
}

export function choose_models() {
  return request({
    url: 'http://127.0.0.1:8000/upload_data/',
    method: 'get',
  })
}