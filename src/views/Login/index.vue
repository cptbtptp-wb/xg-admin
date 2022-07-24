<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/user'
export default {
  name: 'Login',
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3-8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3-8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取表单组件实现对象
    // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$store.dispatch('user/login', this.loginForm)
      this.$router.push('/home')
    }
    // async login () {
    //   // 二次校验
    //   try {
    //     await this.$refs.loginFormRef.validate()
    //     try {
    //       const res = await login(this.loginForm)
    //       console.log(res)
    //       // todo:吧token存到vuex中，并持久化 localStorage
    //       this.$router.push('/layout')
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   } catch (err) {
    //     this.$message.error('登录表单校验失败')
    //   }
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
