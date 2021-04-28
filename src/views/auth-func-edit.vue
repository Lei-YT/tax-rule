<template>
  <div v-cloak>
    <Modal draggable v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>编辑函数</b>
      </p>
      <div>
        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">pid</h4>
          <p>
            <InputNumber
              
              :max="1000000000"
              :min="0"
              v-model="formData.pid"
              placeholder="请输入..."
              style="width:330px"
            />
          </p>
        </div>

        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">name</h4>
          <p>
            <Input
              clearable
              v-model="formData.name"
              placeholder="请输入..."
              type="text"
              style="width:330px"
            />
          </p>
        </div>
        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">sort</h4>
          <p>
            <InputNumber
              :max="1000000000"
              :min="1"
              v-model="formData.sort"
              placeholder="请输入..."
              style="width:330px"
            />
          </p>
        </div>
        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">components</h4>
          <p>
            <Input
              clearable
              v-model="formData.components"
              placeholder="请输入..."
              type="text"
              style="width:330px"
            />
          </p>
        </div>

        <div style="padding:20px 0 20px 0" flex="cross:center">
          <span flex-box="1" >
            <b style="margin-right:35px">enabled</b>
            <i-switch v-model="formData.enabled" />
          </span>
        </div>

      </div>
      <div slot="footer" flex>
        <div flex-box="0">
          <Button @click="cancel">取消</Button>
        </div>
        <div flex-box="1"></div>
        <div flex-box="0">
          <Button type="success" @click="save">提交</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["open", "editData"],
  data() {
    return {
      isShow: false,
      formData: {}
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    _this.formData = JSON.parse(JSON.stringify(_this.editData));
  },
  methods: {
    save() {
      var _this = this;
      // _this.formData.pid = _this.pidNum
      _this.$http.put("/func/modify", _this.formData).then(res => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openEditModel = false;
          //   _this.$parent.items.push(_this.formData)
          _this.$emit("on-change", _this.formData);
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
  width: 90px;
}
</style>
<style>
.diy-model-body .ivu-modal-body {
  height: 500px;
  overflow-y: auto;
}
</style>

