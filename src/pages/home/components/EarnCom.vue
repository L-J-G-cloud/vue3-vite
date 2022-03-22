<template>
  <div>
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="No More"
        loading-text='loading...'
       
    >
        <div class="box flex-col-left" v-for="(item,index) in list" :key="index">
            <div class="flex-bett">
                <p class="top"><span v-text="item.amount"></span> <i v-text="item.symbol"></i> </p>
                <p v-text="item.create_time"></p>
            </div>
            <div>
                {{item.des}}
            </div>
        </div>
    </van-list>
  </div>
</template>

<script setup>
    import {ref} from 'vue'
    import {getdata} from '../../../utils/index'
    let list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const Prop = defineProps({
        onGetLoad:{
            type:Function,
            require:true
        }
    })
    
    const onLoad = async () => {
        let obj = await Prop.onGetLoad()
        list.value = list.value.concat(obj.data);
        list.value.forEach(item=>{
            let {timeDetail} = getdata(item.create_time) 
            item.create_time = timeDetail; 
            item.amount = (item.amount/Math.pow(10,18)).toFixed(4)
        })
        loading.value = false;
        if(list.value.length>=obj.total){
            finished.value = true;
        }
    };
</script>

<style lang="scss" scoped>
    .box {
        color: #D0B9D1;
        border: 1px solid #ccc;
        border-radius: 8px;
        height: 110px;
        margin-bottom: 11px;
        padding: 20px 15px;
        font-size: 12px;
        box-sizing: border-box;
        .top {
            span {
                font-size: 16px;
                color: #fff;
            }
            i {
                font-size: 14px;
            }
        }
        .flex-bett {
            width: 100%;
        }
    }
</style>