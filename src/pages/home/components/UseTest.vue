<template>
  <div>
    456{{ dataObj[0].trade_url }}
    <button @click="change">变化</button>
  </div>
</template>

<script setup>
import { toRef, toRefs, reactive } from "vue";
// export default {
//     setup(){
//         let obj = {name : 'alice', age : 12};
//         let newObj= toRef(obj, 'name');
//         function change(){
//             newObj.value = 'Tom';
//             console.log(obj)
//             console.log(newObj);
//         }
//         return {newObj,change}
//     }
// }

let dataObj = reactive([
  {
    trade_url: "",
    twitter_url: "",
    telegram_url: "",
    msn_url: "",
  },
]);
// toRefs(...dataObj);
const change = () => {
  let obj = [
    {
      trade_url: "1",
      twitter_url: "2",
      telegram_url: "3",
      msn_url: "4",
    },
  ];
  dataObj = obj;

  // Object.assign(dataObj,obj)
  //这样会检测到数据的变化更新ui,assign方法类似于对对象的每个属性赋值，此时vue会检测到变化,等效于下方的操作。
  // dataObj.trade_url = obj.trade_url;
  // dataObj.twitter_url = obj.twitter_url;
  // dataObj.telegram_url = obj.telegram_url;
  // dataObj.msn_url = obj.msn_url;

  // dataObj.push(obj)
  console.log(dataObj); //数据都变化了，视图不会更新，没有检测到数据的变化
};
</script>

<style>
</style>