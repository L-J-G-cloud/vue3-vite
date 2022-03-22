
import axios from 'axios'
import { Toast } from 'vant'
import qs from 'qs'
import fail from '../assets/fail.png'
import Store from '../store/index'
import router from '../router'
// 创建axios实例
const service = axios.create({
    // baseURL: '',
    baseURL: '/api',
    timeout: 50000, // 请求超时时间
})

let ToastInst = null
// request拦截器
service.interceptors.request.use(
    config => {
        config.headers.Token = sessionStorage.token ? sessionStorage.token :''
        // if (config.showIndicator) {
        ToastInst = Toast.loading({
            duration:0,
            message: 'loading',
            forbidClick: true,
            loadingType: 'spinner',
        });
        
        config.method === 'post'
                ? config.data = config.data
                : config.params = {...config.params};
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        config.headers['Accept-Language'] = Store.state.lang;
        config.data=qs.stringify(config.data)
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        if (ToastInst) {
         Toast.clear()
        }

        const res = response.data
        if (res.code === 0) {
            return response.data
        } else if (res.code === 4) {
            Toast({
                message: res.msg,
                icon: fail,
            });
            return response.data
        } else if (res.code === 3) {
            Toast({
                message: res.msg,
                icon: fail,
            });
            sessionStorage.removeItem('token');
            router.push('/')
            return Promise.reject()
        } else if (res.code === 17) {
            console.log('接口报错：用户没没注册')
            return Promise.reject()
        } else {
            Toast({
                message: res.msg,
                icon: fail,
            });
            return Promise.reject(res)
        }
    },
    error => {
        if (ToastInst) {
            Toast.clear()
        }
        console.log('报错了 ==> ',error)
        return Promise.reject(error)
    }
)

export default service
