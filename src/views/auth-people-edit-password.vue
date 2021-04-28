<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>修改密码</b>
      </p>
      <div>
   
        <div class="form-item">
          <h4 class="form-item-title">登录账号</h4>
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
      </div>
      <div slot="footer" flex>
        <div flex-box="0">
          <Button @click="cancel">取消</Button>
        </div>
        <div flex-box="1"></div>
        <div flex-box="0">
          <Button :loading="submitLoading" type="success" @click="save">提交</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["open", "postList","data"],
  data() {
    return {
      isShow: false,
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
    var _this = this;
    _this.isShow = _this.open;
    var data = JSON.parse(JSON.stringify(_this.data))
    _this.formData.username = data.username
  },
  methods: {
    save() {
      var _this = this;
      _this.submitLoading = true;
      _this.$http.put("/user/change", _this.formData).then(res=> {
        if (res) {
          _this.isShow = false;
          _this.$parent.openPasswordModel = false;
        //   _this.$parent.getData();
        }else{
            _this.submitLoading = false
        }
      });
    },
    cancel() {
      this.$parent.openPasswordModel = false;
    }
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
<style>
.diy-model-body .ivu-modal-body {
  height: 500px;
  overflow-y: auto;
}
</style>

