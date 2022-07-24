<template>
  <div :style="{ width: isCollapse ? '64px' : '200px' }" class="admin-aside">
    <!-- <el-aside :width="isCollapse ? '64px' : '200px'" class="admin-aside"> -->
    <div class="toggleMenu" @click="toggleCollapse" :cursor-pointer="true">
      |||
    </div>
    <el-menu
      background-color="#373d41"
      text-color="#fff"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      default-active="/users"
    >
      <el-submenu
        :index="item.id + ''"
        v-for="item in sidebarList"
        :key="item.id"
      >
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>{{ item.authName }}</span>
        </template>
        <el-menu-item
          :index="'/' + item.path"
          v-for="item in item.children"
          :key="item.id"
          >{{ item.authName }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async created () {
    // 调用actions里面的方法1
    await this.$store.dispatch('user/getSideBar')
    // console.log(this.$store)
    // console.log(this.sidebarList)
  },
  data () {
    return {
      // 是否折叠
      isCollapse: false
      // 声明变量，获取请求回来的数据
      // sidebarList: this.$store.state.user.sidebarList
    }
  },
  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {
    ...mapGetters(['sidebarList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.admin-aside {
  height: 100vh;
  .el-menu {
    border-right: none;
  }
}
.toggleMenu {
  width: 100%;
  height: 40px;
  background-color: #ff69b4;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  letter-spacing: 5px;
  color: #fff;
}
</style>
