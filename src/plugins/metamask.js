/*
 * @Author: zw
 * @Date: 2021-11-04 10:43:34
 * @LastEditors: zw
 * @LastEditTime: 2021-11-20 17:20:00
 * @Description:
 */
import detectEthereumProvider from '@metamask/detect-provider'
import { checkIsBscByChainId } from '../utils/bsc'
import Store from '../store/index'
import { i18nText } from './i18n'
import router from '../router'


const ethereum = window.ethereum
let currentAccount = null

//入口功能
async function run() {
  // this returns the provider, or null if it wasn't detected
  //环境监测
  const provider = await detectEthereumProvider()

  if (provider) {
    startApp(provider) // Initialize your app
  } else {
    console.log('Please install MetaMask!')
  }

  //获取chainid
  const chainId = await ethereum.request({
    method: 'eth_chainId',
  })
  handleChainChanged(chainId)

  ethereum.on('chainChanged', handleChainChanged)

  //获取用户名
  ethereum
    .request({
      method: 'eth_accounts',
    })
    .then(handleAccountsChanged)
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err)
    })

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  ethereum.on('accountsChanged', handleAccountsChanged)
}
run()

function startApp(provider) {
  // If the provider returned by detectEthereumProvider is not the same as
  // window.ethereum, something is overwriting it, perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?')
  }
  // Access the decentralized web!
}

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/
function handleChainChanged(_chainId) {
  console.log('current chainid is-->', _chainId)
  const isBscFlag = checkIsBscByChainId(_chainId)
  Store.commit('setChainId', _chainId)
  Store.commit('setIsBscChain', isBscFlag)
  console.log('isBscFlag-->', isBscFlag)

  // We recommend reloading the page, unless you must do otherwise
  // window.location.reload();
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/**************************************************** *******/

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.')
    // toast({
    //     type:'error',
    //     msg:'连接失败，请检查进当前环境是否正确'
    // })
  } else if (!Store.state.account) {
    currentAccount = accounts[0]
    Store.commit('setAccount', currentAccount);
    // Do any other work!
  }else if(accounts[0] !== Store.state.account){
    Store.commit('setAccount', accounts[0]);
    currentAccount = accounts[0]
    sessionStorage.removeItem('token') 
    Store.dispatch('changeload');
    router.push('/')
  }
}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

// You should only attempt to request the user's accounts in response to user
// interaction, such as a button click.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account(s), you should encourage the user
// to initiate the attempt.

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
//连接钱包功能
export function connect(cb) {
  try {
    ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then((data) => {
        handleAccountsChanged(data)
        Store.dispatch('changeload')
        if (cb) {
          cb()
        }
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.')
        } else {
          console.error(err)
        }
      })
  } catch (e) {
    console.log('连接钱包失败', e)
    toast({
      type: 'error',
      msg: i18nText('tip7'),
    })
  }
}
