
const erc20ABI = require('@/abi/erc20-token.json')
// import poolABI from '@/abi/MetaonopolyBuy.json'


import { ethers, utils } from 'ethers'
// import bscConfig from '@/bscConfig'
import { tofixedWithEndPad } from '@/utils'
import addressConfig from '@/abi/contract-address.json'
let usdtContractAddress //usdt合约地址
let buyAddress 
(function  getContractAddress(){
  console.log('当前环境是:',process.env.NODE_ENV)
  const DevChainId = process.env.NODE_ENV == 'pro' ? 56 : 97;
  usdtContractAddress = addressConfig[DevChainId]['USDT'] //usdt合约地址
  buyAddress =  addressConfig[DevChainId]['Buy']
})();
function getContract(address, abi) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  return new ethers.Contract(address, abi, signer)
}

// 获取指定账户的代币余额
export async function getTokenBalance(contract, account, decimal) {
  const tokenContract = getContract(contract, tokenABI)
  const balance = await tokenContract.balanceOf(account)
  console.log(balance)
  return decimalParseToNumber(balance, decimal)
}


//查询授权了多少
export async function allowance(contract, account, mapAddr, decimals) {
  // console.log('method allowance参数为', 'contract', contract, 'account', account, 'mapAddr', mapAddr,'decimals',decimals)
  try {
    const tokenContract = getContract(contract, tokenABI)
    const value = await tokenContract.allowance(account, mapAddr)
    let res = ethers.utils.formatUnits(value, decimals)
    console.log('res', res)
    return res
  } catch (e) {
    throw e
  }

  // if (token.symbol === "YEFI") {
  //   return value.div(Math.pow(10, token.decimals)).toNumber()
  // } else {
  //   return utils.formatEther(value)
  // }
}

//签名
export async function getSignature(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  return await signer.signMessage(address)
}

//授权usdt
export async function approval(from, value, successCb, errorCB) {
  try {
    let to =  buyAddress;
    const tokenContract = getContract(usdtContractAddress, erc20ABI)
    let decimal = 18
    let valueStr = tofixedWithEndPad(value, decimal)
    valueStr = utils.parseUnits(value.toString(), decimal)
    console.log(
      '开始授权[参数debug] 002- >>',
      'to',
      to,
      'valueStr',
      valueStr,
      'from',
      from,
      'decimal',
      decimal
    )
    console.log('start auth！！！！！！！！！！！')
    let res = await tokenContract.approve(to, valueStr, {
      from: from,
      gasLimit: 300000,
    })

    await res.wait()
    if (successCb) {
      successCb()
    }
    console.log('auth finish！！！！！！！！！！！ ')
    console.log('授权 执行完毕', res)
    //contractListener(tokenContract, res, successCb)
    return res
  } catch (e) {
    console.warn('合约报错辣！！！', e)
    if (errorCB) {
      errorCB(e)
    }
  }
}

//调用合约函数
export async function buy(typeId, number) {
  try {
    const  contract = getContract(buyAddress, poolABI)
    console.log('参数_>', typeId, number)
    // debugger
    const res = await contract.buyCard(typeId, number)
    return res
  } catch (e) {
    console.warn('合约报错', e)
  }
}

//转成bignumber
export function decimalParseToBigNumber(num, decimals) {
  let toFixedNum = tofixedWithEndPad(num, decimals)
  return utils.parseUnits(toFixedNum, decimals)
}
//bignumber转成普通
export function decimalParseToNumber(num, decimals) {
  return ethers.utils.formatUnits(num, decimals)
  // let toFixedNum = tofixedWithEndPad(num, decimals)
  // return utils.parseUnits(toFixedNum, decimals)
}
