<template></template>

<script setup>
// import { apiAccountLogin } from '@/api/Login'

import axios from 'axios'

// const login = async () => {
//   const res = await apiAccountLogin({
//     user_name: 'ethan_li',
//     password: '123456'
//   })
//   console.log(res)
// }

// login()

const apiUrl = 'http://192.168.1.203:9080/erp_backend_service/demo/account_login'

const requestData = {
  user_name: 'ethan_li',
  password: '123456'
}

const loignFn = () =>
  axios
    .post(apiUrl, requestData)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })

loignFn()
</script>

<style></style>
