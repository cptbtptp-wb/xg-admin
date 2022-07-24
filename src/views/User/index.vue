<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadCrumb> </BreadCrumb>
    <el-card class="box-card">
      <!-- 头部区域 -->
      <div class="hreader">
        <el-row>
          <el-col :span="8">
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addUser()">添加用户</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 表格区域 -->
      <!-- :data="userList" :相当于v-for -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" prop="id" label="#" width="80">
        </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            ></el-button>
            <el-button
              size="small"
              type="warning"
              icon="el-icon-setting"
              @click="showDialog(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pagenum"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[1, 2, 5, 10]"
        :total="total"
      >
      </el-pagination>

      <!-- 点击齿轮弹出框 -->
      <el-dialog
        title="分配角色"
        @click.native.stop
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form size="mini">
          <el-form-item label="当前的用户:"> {{ username }}</el-form-item>
          <el-form-item label="当前的角色:"> {{ roleName }}</el-form-item>
          <el-form-item label="分配新角色">
            <el-select placeholder="请选择" filterable v-model="select">
              <el-option
                v-for="item in roleNameList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              ></el-option
            ></el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>

      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="dialogFormVisible"
        @click.native.stop
      >
        <el-form :rules="rules" :model="addUsersForm">
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="addUsersForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input v-model="addUsersForm.password"></el-input
          ></el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email"
            ><el-input v-model="addUsersForm.email"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="mobile"
            ><el-input v-model="addUsersForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNewUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getRolesList } from '@/api/permission'
import { getUserList, userStateChange, delUser, getUserInfo, reviseUserRole, getNewUser } from '@/api/user'

export default {
  name: 'userIndex',
  created () {
    this.getUserList()
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号不符合格式'))
    }
    return {
      value: true,
      currentPage4: 4,
      userList: [], // 接收用户列表的数组
      page: { // 放置页码及相关数据
        pagenum: 1, // 当前页码
        pagesize: 20,
        query: ''// 页大小
      },
      total: 0, // 总条数
      dialogVisible: false, // 显示隐藏齿轮弹出框
      userInfoList: [], // 根据id查询用户信息
      roleName: '',
      username: '',
      roleNameList: [],
      select: '', // 角色id
      userId: '', // 用户id
      dialogFormVisible: false, // 添加用户对话框
      formLabelWidth: '120px',
      // 添加用户
      addUsersForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3-10之间', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2-7之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      newUserList: []
    }
  },
  methods: {
    // 分页
    handleSizeChange (pagesize) {
      this.page.pagesize = pagesize
      // 重新加载用户列表数据
      this.getUserList()
    },
    // 分页
    handleCurrentChange (pagenum) {
      this.page.pagenum = pagenum
      this.getUserList()
    },
    // 1.获取用户列表
    async getUserList () {
      const res = await getUserList(this.page)
      // console.log(res)
      this.userList = res.users// 获取用户数据列表
      this.total = res.total // 获取总条数
    },
    // 2.用户修改状态 未完成
    async userStateChange () {
      const res = await userStateChange()
      console.log(res.meta)
    },
    // 3.删除事件
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delUser(id)
        // 删除当前这一页最后一页，应该跑到上一页
        if (this.userList.length === 1 && this.page.page > 1) {
          this.page.page--
        }
        this.getUserList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 4.齿轮设置
    async showDialog (scope) {
      // console.log(scope)
      this.username = scope.username
      this.roleName = scope.role_name
      this.userId = scope.id
      const res = await getUserInfo(scope.id)
      console.log(res)

      this.dialogVisible = true
      // 角色列表
      const res1 = await getRolesList()
      // console.log(res1)
      this.roleNameList = res1
      // const res1 = await getUserRole({ id, rid: res.rid })
      // console.log(res1)
    },
    // 5.点击确定，提交分配角色修改
    async onSubmit () {
      // console.log('select', this.select)
      // console.log('userId', this.userId)
      const res = await reviseUserRole(this.userId, this.select)
      console.log(res)
    },
    // 6.添加用户
    addUser () {
      this.dialogFormVisible = true
    },
    // 7.添加用户
    async addNewUser () {
      await getNewUser(this.addUsersForm)
      // console.log(res)
      this.getUserList()
      this.dialogFormVisible = false
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
  margin-bottom: 15px;
}
.el-button {
  margin-left: 20px;
}
.el-table {
  margin-bottom: 20px;
}
</style>
