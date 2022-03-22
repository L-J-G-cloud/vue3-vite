import  messages from '../langs/index'
import  {createI18n} from 'vue-i18n'
import Store from '../store/index'
import axios from 'axios'
import App from '../main'
export const  i18n = createI18n ({
    fallbackLocale: 'en', //没有其他语言的情况下默认英文
    globalInjection:true, //在全局注入
    silentFallbackWarn: true,//抑制警告
    legacy: false, // you must specify 'legacy: false' option
    locale:Store.state.lang,
    messages
})

export  function setI18nLanguage () {
  Store.state.lang = Store.state.lang=='en' ? 'zh' : 'en'; //只做中英文切换
  App.config.globalProperties.$i18n.locale=Store.state.lang; //修改App的原始属性
  axios.defaults.headers.common['Accept-Language'] = Store.state.lang; //接口请求加上语言标志
  document.querySelector('html').setAttribute('lang', Store.state.lang); 
  Store.dispatch('changeload'); //刷新页面
}

export function i18nText(val) { //导出语言切换使得在其他js文件中也能变换语言
    try {
        const { t } = i18n.global 
        return t(val)  
    } catch (error) {
        console.log(error);
    }
}



