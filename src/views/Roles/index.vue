<template>
  <div>
    <!-- 面包屑导航 -->
    <BreadCrumb></BreadCrumb>
    <el-card class="box-card">
      <!-- 头部区域 -->
      <div class="header">
        <el-button type="primary">添加用户</el-button>
      </div>

      <!-- 表格区域 -->
      <!-- :data="userList" :相当于v-for -->
      <el-table :data="rolesList" border style="width: 100%">
        <el-table-column label="#" width="50" type="expand">
          <template v-slot="scope">
            <!-- 一级菜单 -->
            <el-row
              v-for="item1 in scope.row.children"
              :key="item1.id"
              :class="{ bdbottom: true, bdtop: true, vcenter: true }"
            >
              <el-col :span="5">
                <el-tag>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!--渲染二级权限-->
                <el-row
                  v-for="item2 in item1.children"
                  :key="item2.id"
                  :class="{ vcenter: true }"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!--渲染三级权限-->
                    <el-tag
                      type="warning"
                      closable
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      @close="handleClose(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="scope">
            <el-button size="small" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="small" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              size="small"
              type="warning"
              icon="el-icon-setting"
              @click="showRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分配权限对话框 -->
      <el-dialog title="分配权限" :visible.sync="rightVisible">
        <el-tree show-checkbox></el-tree>
        <template #footer>
          <el-button type="primary">确 定</el-button>
          <el-button @click="rightVisible = false">取 消</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import { getRolesList, delRoleRights, getRightsTree } from '@/api/permission'
export default {
  created () {
    this.getRolesList()
  },
  data () {
    return {
      rolesList: [],
      rightVisible: false, // 默认弹出框关闭
      // id: null
      rightTree: []
    }
  },
  methods: {
    // 获取角色列表
    async getRolesList () {
      const res = await getRolesList()
      // console.log(res)
      this.rolesList = res
    },
    // 删除tag
    async handleClose (scope, rightId) {
      // console.log(rightId)
      const res = await delRoleRights({ roleId: scope.id, rightId })
      // console.log(res)
      // this.getRolesList()
      scope.children = res
    },
    // 分配权限
    // 获取所有权限
    async showRightDialog (scope) {
      // this.id = id
      // console.log(scope)
      const res = await getRightsTree(scope)
      console.log(res)
      this.rightVisible = true
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.el-tag {
  margin: 6px;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.bdtop {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
