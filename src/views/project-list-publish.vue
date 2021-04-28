<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>发布项目</b>
      </p>

      <div>
        <div class="form-item">
          <p class="form-item-title">
            审核人员
            <span style="color:red;">✲</span>
          </p>
          <p>
            <Select v-model="formData.examineId" placeholder="请选择...">
              <Option v-for="vo in AuditUserList" :key="vo.id" :value="Number(vo.id)">{{vo.name}}</Option>
            </Select>
          </p>
        </div>

        <div class="form-item">
          <p class="form-item-title">
            审核信息
            <span style="color:red;">✲</span>
          </p>
          <p>
            <Input v-model="formData.auditOpinion" placeholder="请输入..." type="textarea" :rows="6" />
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
  props: ["open", "id", "publishType"],
  data() {
    return {
      isShow: false,
      formData: {
        examineId: null,
        auditStatus: this.publishType,
        id: this.id,
        auditOpinion: ""
      },
      AuditUserList: [],
      submitLoading: false
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    _this.getAuditUser();
  },
  methods: {
    getAuditUser() {
      var _this = this;
      _this.$http.post(`/item/getAuditUser?projectId=${_this.id}`).then(res => {
        if (res) {
          _this.AuditUserList = res.data.data;
        }
      });
    },
    save() {
      var _this = this;

      if (!_this.formData.examineId) {
        _this._N("请选择审核人员");
        return false;
      }

      if (!_this.formData.auditOpinion) {
        _this._N("请输入审核信息");
        return false;
      }

      _this.submitLoading = true;
      _this.$http.post(`/item/updateState`, _this.formData).then(res => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openPublishModel = false;
          _this.$parent.getData();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    cancel() {
      this.$parent.openPublishModel = false;
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
  padding: 7px 0;
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

