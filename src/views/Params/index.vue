<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadCrumb></BreadCrumb>
    <el-card class="box-card">
      <el-alert
        :closable="false"
        type="warning"
        description="注意：只允许为第三级分类设置相关参数！"
        show-icon
      >
      </el-alert>
      <!-- 选择下拉菜单 -->
      <el-form>
        <el-form-item label="选择商品分类">
          <el-cascader
            v-model="selectdKeys"
            :props="{ value: 'cat_id', label: 'cat_name' }"
            :options="goodsList"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <!-- 表格区域 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="btnDisabled"
            >添加参数</el-button
          >
          <el-table stripe style="width: 100%" :data="paramsDateList" border>
            <el-table-column label="#" width="50" type="expand">
            </el-table-column>
            <el-table-column type="index" label="#" width="180">
            </el-table-column>
            <el-table-column prop="attr_name" label="分类名称" width="700">
            </el-table-column>
            <el-table-column label="操作">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                >编辑</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 静态参数区域 -->
        <el-tab-pane label="静态参数" name="only">
          <el-button type="primary" size="mini" :disabled="btnDisabled"
            >添加属性</el-button
          >
          <el-table stripe style="width: 100%" border>
            <el-table-column
              label="#"
              width="50"
              type="expand"
            ></el-table-column>
            <el-table-column
              type="index"
              label="#"
              width="180"
            ></el-table-column>
            <el-table-column label="分类名称" width="700"></el-table-column>
            <el-table-column label="操作">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                >编辑</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!-- 表格 -->
      <!-- <el-table stripe style="width: 100%" border="">
        <el-table-column label="#" width="50" type="expand"> </el-table-column>
        <el-table-column type="index" prop="date" label="#" width="180">
        </el-table-column>
        <el-table-column prop="name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="warning" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table> -->
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getAddGoods } from '@/api/goods'
import { getParamsData } from '@/api/params'
export default {
  async created () {
    const res = await getAddGoods()
    // console.log(res)
    this.goodsList = res
  },
  data () {
    return {
      form: {
        region: ''
      },
      value: this.catId,
      goodsList: [],
      selectdKeys: [], // 级联选择器选中的id数组
      activeName: 'many', // 激活第几个标签页
      paramsDateList: []// 装参数的列表
    }
  },
  methods: {
    // 监听级联选择器的改变事件
    handleChange (value) {
      this.catId = value[value.length - 1]
      this.getParamsData()
    },
    handleClick () {
      // 监听标签页的点击事件
      this.getParamsData()
    },
    // 获取分类参数的数据
    async getParamsData () {
      // 根据id判断是否选中三级分类,如果未选中则重新选中
      if (this.selectdKeys.length !== 3) {
        this.selectdKeys = []
        this.paramsDateList = []
        this.$message.error('请选择三级分类')
        return
      }
      // 动态参数
      const res = await getParamsData({ catId: this.catId, sel: this.activeName })
      this.paramsDateList = res
    }
  },
  computed: {
    // 当前选中的三级分类id
    datId () {
      return this.selectdKeys.length === 3 ? this.selectdKeys[2] : null
    },
    // 是否禁用按钮
    btnDisabled () {
      return this.selectdKeys.length !== 3
    }
  },
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
// .el-alert__icon.is-big {
//   font-size: 14px !important;
// }
.el-alert {
  margin-bottom: 10px;
}
.el-button {
  margin-bottom: 15px;
}
</style>
