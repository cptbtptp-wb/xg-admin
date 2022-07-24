<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadCrumb></BreadCrumb>
    <el-card class="box-card">
      <el-button type="primary">主要按钮</el-button>
      <!-- 内容区域 -->
      <el-table :data="categoriesList" border stripe style="width: 100%">
        <el-table-column type="index" prop="cat_id" label="#" width="50">
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <i class="el-icon-success" style="color: green"></i>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序"> </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getCategoriesList } from '@/api/goods'
export default {
  created () {
    this.getCategoriesList()
  },
  data () {
    return {
      categoriesList: []
    }
  },
  methods: {
    async getCategoriesList () {
      const res = await getCategoriesList()
      // console.log(res)
      this.categoriesList = res
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.el-button {
  margin-bottom: 20px;
}
</style>
