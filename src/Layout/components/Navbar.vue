<template>
  <div class="header">
    <el-header style="height: 60px">
      <div class="left">
        <img src="@/assets/heima.b5a855ee.png" alt="" />
        <span class="admin-title">青青草原后台管理系统</span>
      </div>
      <button type="button" class="tuichu" @click="logout">
        <span>退出</span>
      </button>
    </el-header>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')// 跳回登录地址
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  .left {
    display: flex;
    align-items: center;
    img {
      width: 61px;
      height: 56px;
      vertical-align: middle;
    }
    .admin-title {
      color: #fff;
      font-size: 22px;
      margin-left: 10px;
    }
  }
  .tuichu {
    margin-top: 12px;
    width: 70px;
    height: 40px;
    background-color: #fff;
    border-radius: 4px;
    span {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
