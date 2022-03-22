<template>
   <div>
        <el-drawer
            v-model="showMenu"
            direction="ltr"
            :show-close = false
            :with-header = false
            :before-close="handleClose"
            size="60%"
        >
            <nav-menu
               @showMenu = 'handleClose'
               :menuData='menuData'
            >
                
            </nav-menu>
        </el-drawer>
   </div>
</template>

<script setup>
    import {reactive} from 'vue'
    import NavMenu from "./NavMenu.vue"
    const Prop =  defineProps({
        showMenu:{
            type:Boolean,
            default:false
        }
    })
    const menuData =reactive(
        [
            {
                icon:'#icon-shouye-01',
                name:'首页',
                path:'/'
            },
            {
                icon:'#icon-xingyunshuzi-01',
                name:'资产',
                path:'/assets'
            },
            {
                icon:'#icon-zichan-01',
                name:'语言',
                path:'/lang'
            }
        ]
    ) 
    const emit = defineEmits(['showMenu'])
    const handleClose=()=>{
        emit('showMenu')
    }
</script>

<style lang='scss'>
    .el-overlay {
        top: 88px;
    }
    .el-drawer__body {
        padding: 0;
    }
</style>