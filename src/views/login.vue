<template>
  <div>
    <div class="wrap-box" flex="main:center cross:center">
      <div>
        <Card style="width:700px" :padding="0" class="card">
          <div flex>
            <div
              flex="main:center cross:center"
              style="width:500px;border-right:#eee 1px solid;background-color:#fff"
            >
            <div style="text-align:center">
            <img src="../assets/logo.png" style="width:250px">
              <h3 style="margin-top:13px;color:#777">茭白智能规则引擎系统</h3>
              <p style="color:#777">Jiaobai Intelligent rule engine</p>
              </div>
            </div>
            <div style="padding:60px 35px;width:430px">
              <h4 style=" margin:0 0 15px 0">用户登录 / User Login</h4>
              <Input
              @on-enter="login"
                v-model="username"
                size="large"
                clearable
                prefix="ios-contact"
                type="text"
                placeholder="账号"
                style="width: 100%"
              />
              <div style="height:15px"></div>
              <Input
              @on-enter="login"
                v-model="password"
                size="large"
                prefix="md-lock"
                type="password"
                password
                placeholder="密码"
                style="width: 100%"
              />
              <div style="height:15px"></div>
              <Button
                :loading="submitLoading"
                size="large"
                type="primary"
                style="width:100%"
                @click="login"
              >登 录</Button>
            </div>
          </div>
        </Card>
        <p style="text-align:center;margin-top:30px;color:#7fc4d7">茭白智能规则引擎 {{version}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "admin",
      password: "123456",
      submitLoading: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    login() {
      var _this = this;
      _this.submitLoading = true;
      _this.$http
        .post("/login", {
          username: _this.username,
          password: _this.password
        })
        .then(function(res) {
          if (res) {
            var data = res.data.data
            _this.$store.commit("token", data.token)
            _this.$http.get("/auth/menu").then(res => {
                if (res) {
                  _this.loopData(res.data.data)
                  _this.$store.commit("menuList", res.data.data);
                  _this.$store.commit("userName", data.username);
                  _this.$store.commit("login", "true");
                  setTimeout(function() {
                    _this.submitLoading = false;
                    _this.$router.push("/");
                  }, 500);
                }else{
                  _this.submitLoading = false;
                }
              });
            
          } else {
            _this.submitLoading = false;
          }
        })
        .catch(function(error) {
          _this.submitLoading = false;
          // console.log(error);
        });
    },
    
    loopData(arr){
      var _this = this ,newArr = []
      _.each(arr,function(v){
        v.title = v.name
        v.name = v.routeName
        v.left = v.side
        if(v.children&&v.children.length){
          _this.loopData(v.children)
        }
      })
    }
  }
};
</script>

<style scoped>
.wrap-box {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #34333f;
  background-image: url(../assets/bg.jpg);
  background-size:auto 100% ;
  background-repeat: no-repeat;
  background-position: center center;
}
.card{
  box-shadow: 10px 10px 10px  rgba(0,0,0,0.1), 10px 10px 10px  rgba(0,0,0,0.1) 
}
</style>
