<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadCrumb></BreadCrumb>
    <el-card class="box-card">
      <div class="hreader">
        <el-row>
          <el-col :span="8">
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>

      <!-- card -->
      <el-table :data="ordersList" border stripe style="width: 100%">
        <el-table-column prop="order_id" type="index" label="#" width="50">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格">
        </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_status === '0'" effect="dark">未支付</el-tag>
          <el-tag v-else type="success"  effect="dark">已支付</el-tag>
        </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="update_time" label="下单时间"> </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getOrdersList } from '@/api/orders'
export default {
  created () {
    this.getOrdersList()
  },
  data () {
    return {
      ordersList: [],
      page: {
        pagenum: 1,
        pagesize: 20
      }
    }
  },
  methods: {
    async getOrdersList () {
      const res = await getOrdersList(this.page)
      // console.log(res)
      this.ordersList = res.goods
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.el-input {
  margin-bottom: 20px;
}
</style>
