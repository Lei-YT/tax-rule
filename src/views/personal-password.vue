<template>
  <div v-cloak>
    <div style="padding:20px;width:400px">
      <div class="form-item">
          <h4 class="form-item-title">用户账号</h4>
          <p>
            <Input readonly v-model="formData.username" placeholder="请输入..." type="text" />
          </p>
        </div>
     <div class="form-item">
          <h4 class="form-item-title">旧密码</h4>
          <p>
            <Input v-model="formData.original" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">新密码</h4>
          <p>
            <Input v-model="formData.password" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <Button :loading="submitLoading" type="success" @click="save" style="width:100px">提交</Button>
        </div>
        
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formData: {
        username:'',
        original:'',
        password:''
      },
      submitLoading:false
    };
  },
  computed: {},
  mounted() {
    this.formData.username = this.userName
  },
  methods: {
    save() {
      var _this = this;
      _this.submitLoading = true;
      _this.$http.put("/user/change", _this.formData).then(res=> {
        if (res) {
          _this._M('修改成功，请重新登陆！')
          _this.$store.commit("token", "");
          _this.$store.commit("userName", "");
          _this.$store.commit("login", "false");
          _this.$router.push({ name: "Login" });
        }else{
            _this.submitLoading = false
        }
      });
    },
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.form-item {
  /* border-bottom: #eee 1px solid; */
  padding: 10px 0;
}
.form-item .form-item-title {
  margin-bottom: 5px;
  overflow: hidden;
}
</style>