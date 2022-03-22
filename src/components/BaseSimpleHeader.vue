<template>
  <div class="header flex-bett">
        <img src="../assets/logo.png" alt="" class="logo">
        <div class="flex-bett">
           <img src="../assets/top.png" alt="" style="width:25px" @click="changeLang()">  
            {{$t('pay')}}
          <base-button
            v-if="!$store.state.account"
            btnWidth="110px"
            btnHeight="32px"
            btnBGC="#97BD4E"
            btnBR="15px"
            btnSize="12px"
            @btnClick = "connectWall"
          >
            Connect Wallet
          </base-button>

           <base-button
            v-else
            btnWidth="69px"
            btnHeight="35px"
            btnBGC="#544A7E"
            btnBR="15px"
            btnSize="12px"
            btnAlign="left"
            @btnClick = "exitWall"
          >
            <img src="../assets/yilianjie.png" alt="" class="isLog">
            <img src="../assets/arr-down.png" alt="" style="width:10px">
          </base-button>
        </div>
     </div>
</template>

<script setup>
    import { useRouter} from 'vue-router'
    import {connect} from '../plugins/metamask'
    import {setI18nLanguage} from '../plugins/i18n'
    import store from '../store'
    const router = useRouter()
    const connectWall = ()=>{
        connect()
    }
    const exitWall = ()=>{
        store.state.account = '';
        router.push('/')
    } 
    
    const changeLang = ()=>{
        setI18nLanguage()
    }
</script>

<style lang="scss" scoped>
.header {
    margin-bottom: 36px;
 }
.isLog {
   width: 33px;
   vertical-align: middle;
   margin-right: 11px;
 }
 .logo {
   width: 67px;
}
</style>