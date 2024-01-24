<template></template>

<script setup>
import { apiWeather36hours } from '@/api/Weather'

const getWeather36hours = async () => {
  const res = await apiWeather36hours({
    Authorization: 'CWA-2901D900-52F8-46CE-9C9E-EA9CF7CA421E'
  })
  console.log(res)
}

getWeather36hours()
</script>

<style></style>
