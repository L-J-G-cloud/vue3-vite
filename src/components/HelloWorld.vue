

<template>
  <h1>{{ msg }}</h1>
  <el-progress :percentage="50">
      <el-button type="text">Content</el-button>
  </el-progress>
  <Button type="warning">vant button</Button>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <Button type="button" @click="count++">count is: {{ count }}</Button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
   <el-button type="primary">Primary</el-button>
    <!-- <el-card class="box-card">
     <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
   </el-card> -->
</template>

<script setup>
import { ref } from 'vue'
import {ElMessage } from 'element-plus'
import { Button } from 'vant';
defineProps({
  msg: String
})
ElMessage({
  message: '登录成功',
  type: 'success',
})
const count = ref(0)
console.log(import.meta.env.VITE_SOME_KEY,import.meta.env.MODE)
</script>


<style lang="scss" scoped>
@import "../var.scss";
a {

  color: #42b983;
}
p {
  a {
    display: inline-block;
     height: $--custom-header__height;
  }
}
</style>
