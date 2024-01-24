// Login.js
// API 文件連結：https://192.168.1.201:4000/erp_backend_apidoc_test/#api-Demo

import Interceptors from './Interceptors'

export const apiAccountLogin = (param) => Interceptors.post('/account_login', { params: param })
