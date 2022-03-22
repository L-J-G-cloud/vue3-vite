

<template>
  <div class="custome-container">
    <!-- 页面头部 -->
      <base-header
        @showMenu="showMenu"
      >
      </base-header>
    <!-- 菜单部分 -->
    <main-menu
      :showMenu = isShowMenu
      @showMenu = showMenu
    >
    </main-menu>
    <!-- 页面主体 -->
    <div class="custome-main">
      <router-view
       v-if="isRouterAlive && $store.state.isReload"
      >
      </router-view>
    </div> 
   </div>
</template>

<script setup>
import { onBeforeMount, onUnmounted,  } from '@vue/runtime-core'
import BaseHeader from './components/frame/BaseHeader.vue'
import MainMenu from './components/frame/menu/MainMenu.vue'
import {ref} from 'vue'
import store from './store'
import './assets/css/common.scss'
import './assets/css/normalize.css'
//做vuex缓存
const saveStore = ()=>{
  sessionStorage.setItem('vuex', JSON.stringify(store.state))
}

onBeforeMount(()=>{
  // beforeunload监听页面刷新事件
  window.addEventListener('beforeunload',saveStore);
})
onUnmounted(()=>{
  // 销毁监听刷新事件
  window.removeEventListener('beforeunload',saveStore)
})

//展示菜单
const isShowMenu = ref(false)
const showMenu = ()=>{
  isShowMenu.value = !isShowMenu.value
}

const isRouterAlive = ref(true)

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
