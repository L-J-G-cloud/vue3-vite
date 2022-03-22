<template>
  <div>
    <info-com :detail="false" class="detail" :dataInfo="objInfo"> </info-com>

    <over-view title="Community" :dataObj="objInfo"> </over-view>

    <div class="view">
      <p class="title"><i></i> <span>Members</span></p>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="No More"
        @load="onLoad"
      >
        <div
          class="box flex-bett"
          v-for="(item, index) in list"
          :key="index"
          @click="goNext(item.id)"
        >
          <div class="flex-col-left box-item">
            <p>
              <img src="../../assets/translateWallet.png" alt="" />
              <span v-text="item.address"></span>
            </p>
            <p>
              <img src="../../assets/logo1.png" alt="" />
              <span v-text="item.user_data.power"></span>
            </p>
          </div>
          <img src="../../assets/arr.png" alt="" class="arr" />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup>
import InfoCom from "./components/InfoCom.vue";
import OverView from "./components/OverView.vue";
import { ref, onMounted, reactive, watch } from "vue";
import { getUserData, getMembers } from "../../api/user";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const user_id = ref(0);
const objInfo = reactive({ typeId: 2 });

const Props = defineProps({
  id: {
    type: Number,
    require: true,
  },
});
onMounted(() => {
  init();
});

//初始化
const init = () => {
  user_id.value = route.params.id;
  getData();
};

//获取下级列表
const form = reactive({
  user_id: 0,
  start: 0,
  limit: 5,
});
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
  form.user_id = user_id.value;
  getMembers(form).then((res) => {
    let { data, total } = res;
    list.value = [...data, ...list.value];
    list.value.forEach((item) => {
      console.log(item);
      item.user_data.power = (item.user_data.power / Math.pow(10, 18)).toFixed(4);
      item.address =
        item.address.substring(0, 5) +
        "..." +
        item.address.substring(item.address.length - 5);
    });
    loading.value = false;
    if (list.value.length >= total) {
      finished.value = true;
    }
  });
};

watch(
  () => route.params.id,
  (next, prev) => {
    if (next != prev) {
      init();
      list.value = [];
      onLoad();
    }
  }
);

//获取基础信息
const getData = () => {
  getUserData({ user_id: user_id.value }).then((res) => {
    let { code, data } = res;
    if (!code) {
      data.balance = (data.balance / Math.pow(10, 18)).toFixed(4);
      data.power = (data.power / Math.pow(10, 18)).toFixed(4);
      Object.assign(objInfo, data);
    }
  });
};

//去新的一级
const goNext = (id) => {
  router.push(`/detail/${id}`);
};
</script>
    
<style lang="scss" scoped>
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

.box {
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 110px;
  margin-bottom: 11px;
  padding: 20px 15px;
  font-size: 14px;
  box-sizing: border-box;
  .box-item {
    height: 100%;
    img {
      width: 21px;
      margin-right: 18px;
      vertical-align: bottom;
    }
  }
  .arr {
    width: 10px;
  }
}
</style>

<style lang="scss">
.detail {
  .top .flex-bett {
    width: 100%;
  }
  .num {
    max-width: 77%;
    word-wrap: break-word;
    border-bottom: none;
    text-align: left;
  }
}
</style>