<template>
  <div class="view">
    <p class="title"><i></i> <span v-text="title"></span></p>
    <div class="flex-bett">
      <el-card class="box-card box-item">
        <img src="../../../assets/people.png" alt="" />
        <p class="num">
          {{ dataObj.typeId == 1 ? dataObj.userCount : dataObj.user_count }}
        </p>
        <p class="address">ADDRESSES</p>
      </el-card>
      <el-card class="box-card box-item">
        <img src="../../../assets/logo1.png" alt="" />
        <p class="num">
          {{ dataObj.typeId == 1 ? dataObj.total_hold : dataObj.power }}
        </p>
        <p class="address">OSPD</p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    require: true,
  },
  dataObj: {
    type: Object,
    require: true,
  },
});
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
  .box-item {
    // padding: 29px 0 22px;
    // padding-bottom: 9999px;margin-bottom: -9999px;
    color: #fff;
    min-height: 152px;
    width: 48%;
    .num {
      font-size: 16px;
      margin-bottom: 5px;
      width: 100%;
      word-break: break-all;
    }
    .address {
      font-size: 11px;
      color: #d0b9d1;
    }
  }
  img {
    width: 42px;
    margin-bottom: 30px;
  }
  .flex-bett {
    align-items: stretch;
  }
}
</style>
<style lang='scss'>
.view {
  .el-card__body {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>