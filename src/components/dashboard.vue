<template>
  <div>
    <!-- <Navbar></Navbar> 插入元件-->
    <Navbar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <!-- 插入元件 -->
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>



<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Alert from './AlertMessage'



//區域註冊元件
export default {
  components:{
    Sidebar,
    Navbar,
    Alert,
  }
}
</script>