<template>
  <div v-cloak>
    <Modal
      v-model="isShow"
      width="460"
      :mask-closable="false"
      :footer-hide="true"
      class-name="diy-model-body"
      @on-cancel="cancel"
    >
      <p slot="header">
        <b>查看数据</b>
      </p>
      <div>
        <div class="form-item" flex>
          <h4 class="form-item-title">姓名：</h4>
          <p>
            {{formData.name}}
          </p>
        </div>
        <div class="form-item" flex>
          <h4 class="form-item-title">年龄：</h4>
          <p>
              {{formData.age}}
          </p>
        </div>
        <div class="form-item" flex>
          <h4 class="form-item-title">性别：</h4>
          <p>
              {{formData.sex}}
          </p>
        </div>
        <div class="form-item" flex>
          <h4 class="form-item-title">电话：</h4>
          <p>
              {{formData.phone}}
          </p>
        </div>
        <div class="form-item" flex>
          <h4 class="form-item-title">Email：</h4>
          <p>
              {{formData.email}}
          </p>
        </div>
        <div class="form-item" flex>
          <h4 class="form-item-title">地址：</h4>
          <p>
              {{formData.address}}
          </p>
        </div>
      </div>

    </Modal>
  </div>
</template>

<script>
export default {
  props: ["open", "data"],
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
    _this.formData = _this.data;
  },
  methods: {
    save() {
      var _this = this;
      _this.isShow = false;
      _this.$parent.openShowModel = false;
    //   _this.$parent.getData();
    },
    cancel() {
      this.$parent.openShowModel = false;
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
  max-height: 500px;
  overflow-y: auto; 
}
</style>

