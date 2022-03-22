import { ethers } from 'ethers';
import { getSignData } from '../api/user'

// import { getSignerDataBSC } from '@/api/user'
// let getSignerDataBSC //從接口拿

const BSC = "BSC"
const YTA = "YTA"

//签名
export async function getSignature(address) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    return await signer.signMessage(address)
}

export async function getSignatureDataBSC(data) {
    let signData = await getSignData()
    let signStr = `${signData.data.timestamp}${signData.data.id}${signData.data.random}`

    const signature = await getSignature(signStr)
    data.signature = signature

    data.signStr = signStr
    data.random = signData.data.random
    data.chain = 'BSC'
    data.timestamp = parseInt(new Date().getTime().toString().substr(0, 10))
    return data
}
//这里列出支持的主链id
const tokenMap = {
    '1': 'ETH',
    '0x1': 'ETH',
    // '128': 'HECO',
    // '0x128': 'HECO',
    '3': 'ETH',  // test
    '0x3': 'ETH', // test

    '56': BSC,
    '0x56': BSC,
    '0x38': BSC,

    '61': BSC,  // test //通过bitkeep 主网bsc拿到的也是61
    '0x61': BSC,  // test
}

//此方法只会返回"YTA"或"BSC" ,不会检测其他接入主链 

//获取当前连接主链【只适用于bitkeep环境】
export async function getChainName() {
    //判断是不是BSC (yta获取ethereum是一个{})
    let chainname = await checkChainNameNotYta()

    if (window.scatter && window.scatter['accounts']) {
        let accounts = window.scatter['accounts']
        for (let i of accounts) {
            let blockchain = i['blockchain']
            if (blockchain) {
                blockchain.toUpperCase() === YTA
                console.log('chainname is: YTA')
                chainname = YTA
            }
        }
    }
    //接入主链不是YTA or BSC
    // return 'BSC'
    // console.log('chainname is: YTA')
    // return isBitKeep() ? null : YTA //默认获取YTA (window.scatter在chrome里获取不到，先做成不是bsc就获取yta)
    return chainname
}

//metamask异步获取bsc用户(其他以太坊主链钱包地址也能拿到)
export async function getBSCAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    // console.log('ethereum',ethereum)
    // console.log('account is:', accounts[0])
    return accounts[0]
}

//判断连接主链是否是bsc
export async function checkIsBsc() {
    if (window.ethereum && typeof window.ethereum.chainId !== 'undefined') {
        /*不通过异步的话，属性返回是有延迟，导致执行到这一步获取不到chainId
        （直接通过ethereum['chainId']的话，该属性官方已经不推荐）*/
        let chainId = await window.ethereum.request({ method: 'eth_chainId' })
        // console.log(window.ethereum.chainId)
        console.log('chainId is', chainId)
        let chainname = tokenMap[chainId];
        return chainname == BSC
    }
    return false
}

//获取除tya以外的'以太坊'主链名字  目前只需要ETH ，BSC
export async function checkChainNameNotYta() {
    //zmark!!!!!!!!!!!!!!!eth没这玩意!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!重新找方法判断

    if (window.ethereum && typeof window.ethereum.chainId !== 'undefined') {
        /*不通过异步的话，属性返回是有延迟，导致执行到这一步获取不到chainId
        （直接通过ethereum['chainId']的话，该属性官方已经不推荐）*/
        let chainId = await window.ethereum.request({ method: 'eth_chainId' })
        // console.log(window.ethereum.chainId)
        console.log('chainId is', chainId)

        let chainname = tokenMap[chainId];
        if (chainname) {
            console.log('chainname is:', chainname)
            // return chainname //!!!!!!!!!!!!!!!先不支持bsc

            return chainname
        }
    }
    return ''
}

export async function getChainId() {
    let chainId = await window.ethereum.request({ method: 'eth_chainId' })
    return chainId
}

export function checkIsBscByChainId(chainId) {
    let chainname = tokenMap[chainId];
    return chainname == BSC
}

export async function getSignatureNew(randomStr) {
    const signature = await getSignature(randomStr)
    return signature
}