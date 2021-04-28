<template>
  <div v-cloak>
    <Modal
      v-model="isShow"
      width="460"
      :mask-closable="false"
      class-name="diy-model-body"
      @on-cancel="cancel"
    >
      <p slot="header">
        <b>编辑数据</b>
      </p>
      <div>
        <div class="form-item">
          <h4 class="form-item-title">姓名</h4>
          <p>
            <Input v-model="formData.name" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">年龄</h4>
          <p>
            <Input v-model="formData.age" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">性别</h4>
          <p>
            <Select v-model="formData.sex" placeholder="请输入...">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">电话</h4>
          <p>
            <Input v-model="formData.phone" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">Email</h4>
          <p>
            <Input v-model="formData.email" placeholder="请输入..." type="text" />
          </p>
        </div>
        <div class="form-item">
          <h4 class="form-item-title">地址</h4>
          <p>
            <Input v-model="formData.address" placeholder="请输入..." type="text" />
          </p>
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
      _this.$parent.openEditModel = false;
      _this.$parent.getData();
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

