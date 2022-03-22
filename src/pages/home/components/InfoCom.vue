<template>
  <div class="info-com">
      <el-card class="box-card">
          <div class="flex-bett top">
            <div class="flex-bett">
               <img src="../../../assets/translateWallet.png" alt="" class="wallet"> 
               <div class="num" v-text="dataInfo.typeId ==1 ? address : dataInfo.address"></div>
               <img src="../../../assets/copy.png" alt="" class="copy" @click="copyHanlder(dataInfo.typeId ==1 ? $store.state.account : dataInfo.address)">
            </div>
            <span v-if="detail" class="detail" @click="goDetail(dataInfo.id)">Detail ></span>
          </div>

          <div class="flex-bett">
            <div class="flex-bett bottom">
               <img src="../../../assets/logo1.png" alt="" class="wallet"> 
               <div class="num" v-text="dataInfo ? dataInfo.balance:''"></div>
               <span> OSPD</span>
            </div>
          </div>
      </el-card>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import {computed} from 'vue'
  import CopyToClipBoard from 'copy-to-clipboard'
  import Store from '../../../store/index'

  const Prop = defineProps({
    detail:{
      type:Boolean,
      default:true
    },
    nums:{
      type:String,
      default:'dasdadasd'
    },
    dataInfo:{
      type:Object,
      require:true
    }
  })
  const address = computed(()=> Store.state.account.substring(0,5) +'...' + Store.state.account.substring(Store.state.account.length-5))
  
  const router = useRouter()
  const goDetail = (query)=>{
    router.push(`/detail/${query}`)
  }

  const copyHanlder = (str)=>{
    CopyToClipBoard(str)
  // Toast({
  //     message: this.$t('copied-successfully'),
  //     icon: require('@/assets/success.png'),
  //  });  
  } 
</script>

<style lang="scss" scoped>
  .box-card {
    box-sizing: border-box;
    // height: 186px;
    padding: 32px 11px;
    color: #fff;
  }
  .wallet {
    width: 28px;
  }
  .copy {
    width: 18px;
  }
  .num {
    font-size: 16px;
    border-bottom: 1px solid #fff;
    margin: 0 11px 0 18px;
  }
  .detail {
    margin-right: 7px;
    color: #D0B9D1;
    font-size: 14px;
  }
  .top {
    padding-bottom: 36px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 33px;
  }

  .bottom {
    .num {
      border-bottom: none;
    }
    span {
      font-size: 14px;
      color: #D0B9D1;
    }
  }
  
</style>
<style lang="scss">
.info-com {
  .el-card__body {
    padding: 0 !important;
  }
}

</style>