<template>
  <el-card>
    <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>

    <!-- 步骤条 -->
    <el-steps :space="300" :active="1" type="card" finish-status="success">
      <!-- 基本信息 -->
      <el-step title="基本信息"> </el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <!-- 状态条 -->
    <el-tabs :tab-position="tabPosition">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input type="number" v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="weight">
            <el-input type="number" v-model="ruleForm.weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="count">
            <el-input type="number" v-model="ruleForm.count"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              :options="addGoodsList"
              :props="{
                value: 'cat_id',
                label: 'cat_name',
              }"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 商品参数 -->
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>

      <!-- 商品图片 -->
      <el-tab-pane label="商品图片">
        <!-- action:图片上传的api接口地址 -->
        <el-upload
          :action="uploadURL"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture"
          name="file"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getAddGoods } from '@/api/goods'
export default {
  name: 'AddIndex',
  // 添加商品
  async created () {
    const res = await getAddGoods()
    // console.log(res)
    this.addGoodsList = res
  },
  data () {
    return {
      value: [],
      tabPosition: 'left',
      // 基本信息表单
      ruleForm: {
        name: '',
        price: '',
        weight: '',
        count: '',
        classify: ''
        // pics: []// 图片的数组
      },
      // 基本信息表单校验规则
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        count: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      // 商品分类数组
      addGoodsList: [],
      uploadURL: 'http://liufusong.top:8888/api/private/v1/upload'// 上传图片地址
    }
  },
  methods: {
    // 上传图片
    // 处理移除图片操作
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 处理图片预览效果
    handlePreview (file) {
      console.log(file)
    }
    // 点击上传商品图片
    // async uploadGoodsImg () {
    //   const file = await uploadGoodsImg()
    //   console.log(file)
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-alert {
  margin-bottom: 20px;
}
::v-deep .el-icon-info {
  font-size: 14px;
}
.el-steps--horizontal {
  margin-left: 150px;
  margin-bottom: 15px;
}
</style>
