<template>
  <div>
    <div class="container">
      切換語言：
      <select @change="handleChangeLanguage">
        <option value="zh-TW">中文</option>
        <option value="en-US">English</option>
      </select>
      <p>{{ $t('add') }} {{ $t('edit') }} {{ $t('delete') }}</p>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const handleChangeLanguage = (event) => {
  locale.value = event.target.value
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

select {
  padding: 4px 8px;
  font-size: 14px;
  border: 1px solid $blue-light;
  border-radius: 5px;

  :focus {
    border: 1px solid $blue;
  }
}

p {
  margin-top: 20px;
  font-size: 16px;
}
</style>
