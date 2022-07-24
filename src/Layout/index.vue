<template>
  <el-container class="container">
    <el-header><Navbar></Navbar></el-header>

    <!-- 左边栏sidebar -->
    <!-- <el-aside style="width:200px"></el-aside> -->
    <el-container>
      <el-aside width="none">
        <SideBar></SideBar>
      </el-aside>
      <!-- 右边栏 main-->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navbar from './components/Navbar.vue'
import SideBar from './components/side-bar.vue'
// import AppMain from './components/AppMain.vue'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {
    Navbar,
    SideBar
  }
}
</script>

<style scoped lang='less'>
.container {
  display: flex;
  height: 100vh;
  .el-header {
    background-color: #373d41;
    // position:absolute;
    height: 60px;
  }
  .el-aside {
    background-color: #373d41;
    height: calc(100vh - 70px);// 设置左侧 aside 高度
  }
  .el-main {
    background-color: #eaedf1;
    height: calc(100vh - 70px);// 设置主体 main 高度
  }
}
</style>
