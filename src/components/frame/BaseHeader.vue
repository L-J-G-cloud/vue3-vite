<template>
  <div class="custome-header">
        <div class="left-ctrl__btn" @click="showMenu">
            <i class="iconfont icon-caidan" style="font-size:25px"></i>
        </div>
        <base-button
            btnWidth = '90px'
            @btnClick = "btnClick"
        >
        {{store.state.lang}}
        </base-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '../../components/BaseButton.vue'
import { useStore } from 'vuex'
import {setI18nLanguage} from '../../plugins/i18n'
// import i18n from '../../langs/index' 

const store = useStore();
const isMenu = ref(false);

const btnClick = ()=>{
    setI18nLanguage();
}


const emit = defineEmits(['showMenu'])
const showMenu = ()=>{
    emit('showMenu')
}

</script>

<style lang=scss scoped>
    .custome-header {
        padding: 0 12px;
        background-color: #1E184C;
        height: 88px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconfont {
            font-size: 20px;
            color: #fff;
        }
    }
</style>