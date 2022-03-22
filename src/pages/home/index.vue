<template>
  <div class="contain-box">
    <!-- <use-test>

    </use-test> -->

    <div class="swipe">
      <img src="../../assets/banner.png" alt="" />
    </div>

    <el-card class="box-card">
      <div class="top">
        <div class="flex-bett">
          <div class="flex-bett box-left">
            <img src="../../assets/logo1.png" alt="" />
            <h4><span>Omnisphere DAO</span></h4>
          </div>
          <div class="flex-spac top-rig">
            <img
              src="../../assets/niao.png"
              alt=""
              @click="goChange(dataObj.twitter_url)"
            />
            <img
              src="../../assets/plan.png"
              alt=""
              @click="goChange(dataObj.telegram_url)"
            />
            <img
              src="../../assets/M.png"
              alt=""
              @click="goChange(dataObj.msn_url)"
            />
          </div>
        </div>
      </div>

      <div class="center flex-col-left">
        <!-- <img src="../../assets/bsc.png" alt=""> -->
        <p class="price">Price</p>
        <p>
          <strong>{{ dataObj.price }}</strong
          ><i>{{ dataObj.symbol }}</i>
        </p>
      </div>
      <div class="bottom flex-bett">
        <div class="flex-col-left">
          <p class="text">Smart Contract</p>
          <p class="con">
            <span>{{ dataObj.contract }}</span>
            <img
              src="../../assets/copy.png"
              alt=""
              class="copy"
              @click="copyHanlder(contract)"
            />
          </p>
        </div>
        <base-button
          btnWidth="97px"
          btnHeight="32px"
          btnBGC="#97BD4E"
          btnBR="15px"
          btnSize="14px"
          btnAlign="left"
          btnPadding="0 0 0 12px"
          @btnClick="goChange(dataObj.trade_url)"
        >
          <img src="../../assets/tu.png" alt="" class="tu" /> Trade
        </base-button>
      </div>
    </el-card>

    <over-view title="Overview" :dataObj="OverData"> </over-view>

    <div class="view">
      <p class="title"><i></i> <span>Info</span></p>
      <div class="flex-col-center" v-if="!$store.state.account">
        <img src="../../assets/wallet.png" alt="" class="wallet" />
        <base-button
          btnWidth="121px"
          btnHeight="32px"
          btnBGC="transparent"
          btnBR="15px"
          btnSize="12px"
          btnBC="1px solid #FFF"
          @btnClick="connectWall"
        >
          Connect Wallet
        </base-button>
      </div>
      <info-com v-else :dataInfo="info"> </info-com>
    </div>

    <div class="view" v-if="$store.state.account">
      <p class="title"><i></i> <span>Earn</span></p>
      <earn-com :onGetLoad="getAssetJR"> </earn-com>
    </div>
  </div>
</template>

<script setup>
import { connect } from "../../plugins/metamask";
import BaseButton from "../../components/BaseButton.vue";
import CopyToClipBoard from "copy-to-clipboard";
import store from "../../store";
import OverView from "./components/OverView.vue";
import InfoCom from "./components/InfoCom.vue";
import EarnCom from "./components/EarnCom.vue";
import { tokenData, getUser, assetJR, overView } from "../../api/user";
import { onMounted, reactive, ref } from "vue";
import UseTest from "./components/UseTest.vue";
let dataObj = reactive({
  trade_url: "",
  twitter_url: "",
  telegram_url: "",
  msn_url: "",
});

const goChange = (url) => {
  window.location.href = url;
};

const copyHanlder = (str) => {
  CopyToClipBoard(str);
};

const contract = ref("");
const info = reactive({ typeId: 1 });

onMounted(async () => {
  // await getUserData();
  getTokenData();
  // getOverView();
});

//获取大平台数据
const getTokenData = async () => {
  let { data } = await tokenData();
  data.price = (data.price / Math.pow(10, 8)).toFixed(4);
  contract.value = data.contract;
  data.contract =
    data.contract.substring(0, 5) +
    "..." +
    data.contract.substring(data.contract.length - 5);
  Object.assign(dataObj, data);
};

//获取贡献
const OverData = reactive({
  total_hold: "0",
  userCount: 0,
  typeId: 1,
});

const getOverView = async () => {
  let { data } = await overView();
  data.total_hold = (data.total_hold / Math.pow(10, 18)).toFixed(4);
  Object.assign(OverData, data);
};

const getUserData = async () => {
  let { data } = await getUser({ address: store.state.account });
  data.user_data.balance = (data.user_data.balance / Math.pow(10, 18)).toFixed(
    4
  );
  Object.assign(info, data.user_data);
};

//获取流水记录
const form = reactive({
  address: store.state.account,
  start: 0,
  limit: 5,
});
const list = ref([]);
const getAssetJR = async () => {
  let { code, data, total } = await assetJR(form);
  if (!code) {
    return { data, total };
  }
};

const connectWall = async () => {
  connect();
};
</script>

<style lang='scss' scoped>
.contain-box {
  .qiu {
    width: 23px;
    margin-right: 9px;
  }
  .swipe {
    width: 100%;
    height: auto;
    margin-bottom: 18px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .box-card {
    height: 217px;
    box-sizing: border-box;
  }
  .top {
    margin-bottom: 26px;
    .box-left {
      height: 40px;
      img {
        width: 44px;
        margin-right: 4px;
      }
      span {
        font-size: 18px;
        color: #d0b9d1;
      }
    }
    .top-rig {
      img {
        width: 17px;
        &:nth-child(2) {
          width: 19px;
          margin: 0 16px 0 14px;
        }
      }
    }
  }

  .center {
    color: #fff;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    .price {
      color: #d0b9d1;
      font-size: 12px;
    }
    img {
      width: 22px;
      vertical-align: middle;
      margin-right: 8px;
    }
    strong {
      font-size: 24px;
      color: #fff;
    }
    i {
      font-size: 14px;
    }
  }

  .bottom {
    padding-top: 13px;
    .copy {
      width: 18px;
      vertical-align: bottom;
    }
    .text {
      font-size: 12px;
      color: #d0b9d1;
      margin-bottom: 6px;
    }
    .con {
      font-size: 14px;
      color: #fff;
    }
    .tu {
      width: 21px;
      vertical-align: middle;
    }
  }
  .wallet {
    width: 76px;
    margin-bottom: 18px;
  }
  .view {
    color: #fff;
    margin-top: 26px;
    .title {
      text-align: left;
      margin-bottom: 16px;
      color: 18px;
      i {
        display: inline-block;
        width: 4px;
        height: 4px;
        vertical-align: middle;
        border-radius: 4px;
        background-color: #95bf4f;
      }
    }
  }
}
</style>

