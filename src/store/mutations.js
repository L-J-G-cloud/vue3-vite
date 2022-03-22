// import {setI18nLanguage } from '../plugins/i18n'

export default {
    //设置当前语言环境
    // setLang: (state, lang) => {
    //     state.lang = lang;
    //     setI18nLanguage(lang);
    // },
    //设置当前的链是哪个主链id
    setChainId: (state, chainId) => {
        state.chainId = chainId
    },
    //设置是否是bsc链
    setIsBscChain: (state, isBscChain) => {
        state.isBscChain = isBscChain
    },
    //存储当前账号
    setAccount: (state, account) => {
        state.account = account
    },
    // 重新加载
    toReload(state, msg) {
        state.isReload = msg //先关闭，
    },
    //是否授权 
    setAuthorized: (state, isAuthorization) => {
       state.isAuthorization = isAuthorization
    },
    //用户是否已经注册过
    setUserIsAlreadyRegisted: (state, userISAlreadyRegisted) => {
       state.userISAlreadyRegisted = userISAlreadyRegisted
    },
}