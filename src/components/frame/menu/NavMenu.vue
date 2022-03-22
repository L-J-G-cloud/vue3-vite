<template>
    <el-menu
        active-text-color="#ffd04b"
        class="el-menu-vertical-demo"
        default-active="0"
        text-color="#333"
        @select="handleSelect"
    >
        <el-menu-item  v-for="(item,index) in menuData" :key="index" :index="String(index)">
          <el-icon>
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
            </svg>
          </el-icon>
          <span v-text="item.name"></span>
        </el-menu-item>
      </el-menu>
</template>

<script setup>
    import {useRouter} from 'vue-router'
    const Prop =  defineProps({
        menuData:{
            type:Array,
            require:true
        }
    })

    const router = useRouter()

    const emit = defineEmits(['showMenu'])
    const handleSelect = (key,keyPath)=>{
        emit('showMenu');
        router.push(Prop.menuData[key]['path'])
    }
</script>

<style lang='scss'>
    .el-menu-item {
        height: 40px;
        line-height: 40px;
    }
</style>