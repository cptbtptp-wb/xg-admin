<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadCrumb></BreadCrumb>
    <!-- header -->
    <el-card class="box-card">
      <div class="hreader">
        <el-row>
          <el-col :span="8">
            <el-input
              placeholder="请输入内容"
              class="input-with-select"
              v-model="page.query"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="onRefer"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="$router.push('goods/add')"
              >添加商品</el-button
            >
          </el-col>
        </el-row>
      </div>

      <!-- card -->
      <el-table :data="goodsList" border stripe style="width: 100%">
        <el-table-column prop="goods_id" type="index" label="#" width="50">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="500">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="upd_time" label="创建时间"> </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="warning" icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pagenum"
        :page-size="page.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getGoodsList } from '@/api/goods'
export default {
  name: 'GoodsIndex',
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      goodsList: [],
      currentPage4: 4,
      total: 0, // 总条数
      page: {
        pagenum: 1,
        pagesize: 20,
        query: ''
      }

    }
  },
  methods: {
    // 分页
    handleSizeChange (pagesize) {
      this.page.pagesize = pagesize
      // 重新加载商品列表数据
      this.getGoodsList()
    },
    // 分页
    handleCurrentChange (pagenum) {
      this.page.pagenum = pagenum
      this.getGoodsList()
    },
    // 获取商品列表
    async getGoodsList () {
      const res = await getGoodsList(this.page)
      // console.log(res)
      this.goodsList = res.goods
      this.total = res.total // 获取总条数
    },
    // 根据查询参数获取对应得数据
    async onRefer () {
      await getGoodsList(this.page)
      // console.log(res)
      this.getGoodsList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.el-row {
  margin-bottom: 20px;
  .el-col {
    margin-right: 20px;
  }
}
</style>
