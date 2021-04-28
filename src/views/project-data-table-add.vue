<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" draggable @on-cancel="cancel">
      <p slot="header">
        <b>添加表</b>
      </p>

      <div>
        <div class="form-item">
          <p class="form-item-title">
            表名称
            <span style="color:red;">✲</span>
          </p>
          <p>
            <Input v-model="formData.tableName" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <p class="form-item-title">
            表类型
            <span style="color:red;">✲</span>
          </p>
          <p>
            <Select v-model="formData.tableType" placeholder="请选择...">
              <Option v-for="vo in typeList" :key="vo" :value="vo">{{vo}}</Option>
            </Select>
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
  props: ["open"],
  data() {
    return {
      isShow: false,
      formData: {
        projectId: Number(this.$route.query.id),
      },
      typeList: ["影像表", "数据表", "虚拟表", "规则表"],
      submitLoading: false,
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
  },
  methods: {
    save() {
      var _this = this;

      if (!_this.formData.tableName) {
        _this._N("请输入表名称");
        return false;
      }

      if (!_this.formData.tableType) {
        _this._N("请选择表类型");
        return false;
      }

      _this.submitLoading = true;
      _this.$http.post("/data/addTable", _this.formData).then((res) => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openTableAddModel = false;
          _this.$parent.getTableData();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    cancel() {
      this.$parent.openTableAddModel = false;
    },
  },
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

