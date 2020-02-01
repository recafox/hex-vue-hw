<template>
  <div class="hello">
    <a href="#" @click.prevent="signout" class='btn-primary btn active' role='button'>Sign out</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{

    }
  },
  methods:{
    //登出功能
    signout(){
       //指定的伺服器位置(見api文檔 https://github.com/hexschool/vue-course-api-wiki/wiki/%E7%99%BB%E5%85%A5%E5%8F%8A%E9%A9%97%E8%AD%89)
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      //使用post(因為非單純讀取而是要傳入), 傳入api以及v-model中的user資訊
      this.$http.post(api).then(response => {
        console.log(response.data);

        if(response.data.success){
            //$router.push('要前往的路由位置')
            vm.$router.push('/login');
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
