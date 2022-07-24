<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- card区域 -->
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.list = this.$route.meta.BreadCrumb
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 14px;
}
</style>
