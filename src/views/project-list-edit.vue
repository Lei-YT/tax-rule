<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>添加项目</b>
      </p>
      <div>
        <div class="form-item">
          <h4 class="form-item-title">项目代码</h4>
          <p>
            <Input v-model="formData.projectCode" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">项目名称</h4>
          <p>
            <Input v-model="formData.projectName" placeholder="请输入..." type="text" />
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
  props: ["open","data","tableType"],
  data() {
    return {
      isShow: false,
      formData: {
          projectCode:'',
          projectName:''
      },
      submitLoading:false
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open
    _this.formData = JSON.parse(JSON.stringify(_this.data))
  },
  methods: {
    save() {
      var _this = this;
      if (!_this.formData.projectCode) {
        _this._N("请输入项目代码");
        return false;
      }
      if (!_this.formData.projectName) {
        _this._N("请输入项目名称");
        return false;
      }
      _this.submitLoading = true;
      _this.$http.post("/item/update", _this.formData).then(res=> {
        if (res) {
          _this.isShow = false;
          _this.$parent.openEditModel = false;
          _this.$parent.getData();
        }else{
            _this.submitLoading = false
        }
      });
    },
    cancel() {
      this.$parent.openEditModel = false;
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

