<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

// import "fontawesome";
import { mapGetters } from "vuex";
import { fetch } from '@/util/request'
export default {
  name: 'app',
   computed: mapGetters({
    logged: "logged",
  }),
   mounted() {
 
    if (this.logged) {
      this.setRouter();
    }
    // 判断是否输入了login页面
    let isLogin = window.location.href.includes('login')
    if (isLogin) {
      this.requestLogout();
    }
    
  },
  methods: {
     /*
       * 退出
       */
    requestLogout() {
      fetch('fetchLogout', data => {
        if(data.code == 200) {
          this.$router.push('/login');
        }else {
          messagePopup(data.msg || this.result)
        }
      })
    },
    
     setRouter() {
      if(this.logged) {
        return this.$router.push('/login');
      }else {
        this.$router.push('/index/indexContent')
      }     
    },
  },
  watch: {
     // 监听登录状态
    logged: "setRouter",
  }
}
</script>