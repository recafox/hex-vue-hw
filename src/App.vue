<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  created() {
    // //使用全域環境變量的方式加載API, 之後若要修改則修改.env檔
    // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;

    // this.$http.get(api).then(response => {
    //   console.log(response.data);
    // });
  }
};
</script>
<style lang = 'scss'>
/* 路徑 */
/* @import '~bootstrap/scss/bootstrap' */
@import "./assets/all";
</style>
