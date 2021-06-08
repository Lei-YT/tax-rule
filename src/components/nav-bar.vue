<template>
  <div v-cloak>
    <div flex class="nav-bar">

      <div flex-box="1" flex="cross:center" style="padding-left: 10px">
        <p style="padding-left: 14px; font-size: 15px">
          中铁隧道局Human-AI协同平台-规则引擎
          <span style="font-size: 12px;  margin: 3px 0 0 5px">{{
            version
          }}</span>
        </p>
      </div>

      <div flex-box="0" flex class="right-icon" style="margin-right: 10px">

        <Poptip trigger="click" transfer placement="bottom-end">
          <div class="right-icon-item" flex="main:center cross:center">
            <Icon :size="16" type="md-person" />
            <span style="margin: 0 0 0 5px">{{ userName }}</span>
          </div>
          <div slot="content">
            <ul class="right-icon-item-dropdown">
              <li @click="toLink('personal-password')" flex="cross:center">
                <Icon
                  :size="16"
                  custom="iconfont icon-write"
                  style="margin-right: 10px"
                />
                <span>修改密码</span>
              </li>
              <li flex="cross:center" @click="logout">
                <Icon
                  :size="16"
                  custom="iconfont icon-exit"
                  style="margin-right: 10px"
                />
                <span>安全退出</span>
              </li>
            </ul>
          </div>
        </Poptip>
      </div>
    </div>
  </div>
</template>

<script>
import { side } from "@/mixins/mixins";
export default {
  mixins: [side],
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {
    //   console.log('nav-bar')
  },
  methods: {
    open() {
      var _this = this;
      // setTimeout(function(){
      //   _this.$refs.userbox.$el.style.top='100px'
      // },1000)
    },
    sideSwitch() {
      this.$store.commit("side", !this.$store.state.side);
    },

    logout() {
      var _this = this;
      _this.submitLoading = true;
      _this.$http
        .post("/logout")
        .then(function (res) {
          _this.$store.commit("token", "");
          _this.$store.commit("userName", "");
          _this.$store.commit("login", "false");
          _this.submitLoading = false;
          _this.$router.push({ name: "Login" });

          //关闭浏览器
          // if (
          //   navigator.userAgent.indexOf("Firefox") != -1 ||
          //   navigator.userAgent.indexOf("Chrome") != -1
          // ) {
          //   window.location.href = "about:blank";
          //   window.close();
          // } else {
          //   window.opener = null;
          //   window.open("", "_self");
          //   window.close();
          // }
        })
        .catch(function (error) {
          _this.submitLoading = false;
          // console.log(error);
        });
    },

    //全屏
    fullScreen() {
      var el = document.documentElement;
      var rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
      if (rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
      this.$store.state.isFullScreen = true;
      this.isFullScreen = true;
      this.isAside = false;
    },

    //退出全屏
    exitFullScreen() {
      var el = document;
      var cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;
      if (cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
      this.$store.state.isFullScreen = false;
      this.isFullScreen = false;
      this.isAside = true;
    },
  },
};
</script>
<style scoped>
.nav-bar {
  height: 45px;
  background-color: #1991DD;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  color: #fff;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  z-index: 10;
}
.nav-bar .logo {
  font-size: 16px;
  color: #65a6b6;
  height: 45px;
  background-color: #1991DD;
  width: 240px;
}
/* .nav-bar .logo:hover {
  color: #75829b;
} */
.right-icon .right-icon-item {
  padding: 0 15px;
  height: 45px;
  position: relative;
  cursor: pointer;
}
.right-icon .right-icon-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.right-icon-item-dropdown li {
  border-bottom: #eee 0.5px solid;
  height: 40px;
  cursor: pointer;
}
</style>
