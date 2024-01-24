// Weather.js
// API 文件連結：https://opendata.cwa.gov.tw/dist/opendata-swagger.html#/

import interceptors from './Interceptors'

const apiWeatherURL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/'

export const apiWeather36hours = (param) =>
  interceptors.get(`${apiWeatherURL}F-C0032-00`, { params: param })
