/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-10 15:24:44
* @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2019-09-18 11:21:20
*/

<template>
  <div class="login-page" v-if="logged" :style="{height: `${domH}px`}">
    <div id="page-container" class="page-posi">
      <h2>权限管理</h2>
      <div class="login-vision"></div>
      <!-- begin login -->
      <div class="login animated fadeInDown">
        <div class="login-container-m">
          <!-- begin brand -->
          <div class="logo"></div>
          <!-- end brand -->
          <div class="login-content">
            <form @submit.prevent="submit" name="loginForm" id="loginForm" class="margin-bottom-0">
              <div class="form-group m-b-15 ibg1">
                <input type="text" @input="getUsername" :value="username" name="username" placeholder="用户名"/>
              </div>
              <div class="form-group m-b-15 ibg2">
                <input type="password" @input="getPassword" name="password" placeholder="密码"/>
              </div>
              <!-- <div class="form-group ibg3">
                <input type="text" @input="getCode" name="code" placeholder="不区分大小写"><img
                :src="`${host}/waming/kaptcha`"
                onclick="this.src='/backend/waming/kaptcha?t='+new Date()*1" height="23"
                width="65"/>
              </div> -->
              <div class="login-buttons">
                <input type="submit" class="btn btn-success btn-block btn-sm" value="登录"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "./index.scss"
  import {mapGetters} from "vuex"
  import {fetch} from '@/util/request'
  import {getCookie, setCookie, messagePopup} from '@/util/util'
  import config from '@/config/base.config'

  let host = config.proxyHost

  export default {
    data() {
      return {
        domH: window.innerHeight,
        inputtext: {},
        host: host,
        username: '', // 用户名
        password: '', // 密码
        code: '', // 验证码
        loading: '', // 加载中提示
      }
    },
    props: {
      requestChangePwd: Function
    },
    components: {},
    computed: mapGetters({
    logged: "logged",
 
  }),
    
    methods: {
      submit() {
        // 验证判断
        if (this.validateForm() == true) {
          this.loading = this.$loading({
            text: '正在登录',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
          // 获取参数
          let params = {
            username: this.username,
            password: this.password,
            // code: this.code
          }
          fetch('fetchLogin', params, (data) => {
            this.loading.close() // 关闭加载中
            if (data.code == 200) {

              localStorage.setItem('isInit', true)
              // 登录成功(状态设置)
              this.$store.commit('setLoginState', false)
            } else {
              messagePopup(data.msg)
            }
          })
        }
      },
      /*
       * 验证表单字段是否为空
       */
      validateForm() {
        const {username, password, code} = this
        // 用户名验证
        if (_.isEmpty(username)) {
          messagePopup('用户名不能为空 !')
          return false
        }
        // 密码验证
        if (_.isEmpty(password)) {
          messagePopup('密码不能为空 !')
          return false
        }
        // // 验证码
        // if (_.isEmpty(code)) {
        //   messagePopup('验证码不能为空 !')
        //   return false
        // }
        // let realCode = getCookie('code')
        // if (_.trim(code.toLowerCase()) != realCode.toLowerCase()) {
        //   messagePopup('验证码不正确 !')
        //   return false
        // }
        return true
      },
      /**提示框 */
      messagePopup(text) {
        this.$message({
          message: text,
          duration: 1500, // 0 不关闭弹窗
          center: true,
          type: ''
        });
      },
      /** 用户名*/
      getUsername(e) {
        this.username = e.target.value
      },
      /** 用户名密码 */
      getPassword(e) {
        this.password = e.target.value
      },
      /**验证码 */
      getCode(e) {
        this.code = e.target.value
      },
    }
  };
</script>




