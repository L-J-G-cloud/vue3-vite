<template>
  <div>
        <div class="box">
            <van-radio-group v-model="lang">
                <van-cell-group>
                    <van-cell v-for="(item,index) in list" :class="item.value==lang?'selected':''" :key="index" :title="item.lable" clickable @click="lang = item.value">
                        <template #right-icon>
                            <van-radio :name="item.value">
                                <template #icon="props">
                                    <img class="img-icon" :src="activeIcon" v-if="props.checked"/>
                                    <!-- <img class="img-icon" :src="props.checked ? activeIcon : ''" /> -->
                                </template>
                            </van-radio>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <div class="tex-cen btn-box">
                 <div class="btn-box-line"></div>
                 <div class="sure-btn">
                     <button class="btn" @click="switchLang" v-text="$t('sure')"></button>
                 </div>
                 
            </div>
           
        </div>
  </div>
</template>

<script setup>
import {setI18nLanguage} from '../../plugins/i18n'
import store from '../../store'
import activeIcon from "../../assets/actionLang.png"
import success from '../../assets/success.png'
import {Cell,CellGroup,Toast,RadioGroup,Radio} from 'vant';
import { onMounted, reactive } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n'
import {ref} from 'vue'
  const { t } = useI18n()
  const lang = ref('');
  const list = reactive([{lable: t('simplified-chinese'),value:'zh'},{lable:'English',value:'en'}]);

  onMounted(()=>{
    lang.value = store.state.lang
  })

  const switchLang = ()=>{
    if(lang.value == store.state.lang) {
      return;
    }
    setI18nLanguage(lang)
    Toast({
      message: t('switch-succ'),
      icon: success,
    });
  }
</script>

<style lang="scss" scoped>
    .img-icon {
        width: 17px;
    }
    .box {
         background-color: #14151A;
         border-radius: 15px;
         padding-bottom: 18px;
         margin: 0;
         .btn-box {
            padding: 0 16px;
            .btn-box-line {
                border-top: 1px solid #ccc;
                transform: scaleY(.4);
            }
         }
        .btn {
            width: 178px;
            height: 40px;
            margin-top: 20px;
            background: linear-gradient(to right,#F1BF2D ,#AD1C17,);
            border: none;
            border-radius: 5px;
            color: #fff;
        }
        .van-cell__title {
            font-weight: 700;
        }
        
        .van-cell::after {
            border-bottom: 1px solid #ccc;
            // transform: scaleY(1.5);
        }
       .van-cell , .van-cell-group {
            background-color: #14151A;
            border-radius: 15px 15px 0 0; 
            color: #fff;   
        }
        .van-cell {
            padding: 16px;
        }
        .sure-btn{
            padding: 0 60px;
        }
    }
</style>
<style lang="scss">
.box {
    .van-radio__icon--checked .van-icon {
        background-color: #fff ;
        border-color : #fff
    }
    .selected{
        color: #F1BF2D !important;
    }
    .van-radio__icon--checked 
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
        border-width: 0;
    }
    [class*=van-hairline]::after {
        border: none;
    }
}

</style>