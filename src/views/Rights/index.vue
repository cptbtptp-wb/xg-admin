<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadCrumb></BreadCrumb>
    <!-- 内容区域 -->
    <el-table stripe border :data="rightsList" style="width: 100%">
      <el-table-column type="index" prop="id" label="#" width="50">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === '0'">等级一</el-tag>
          <el-tag v-else-if="scope.row.level === '1'" type="success">等级二</el-tag>
          <el-tag v-else type="warning">等级三</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getRightsList } from '@/api/permission'
export default {
  created () {
    this.getRightsList()
  },
  data () {
    return {
      list: 'list',
      rightsList: []
    }
  },
  methods: {
    async getRightsList () {
      const res = await getRightsList(this.list)
      // console.log(res)
      this.rightsList = res
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
</style>
