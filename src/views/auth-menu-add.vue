<template>
  <div v-cloak>
    <Modal draggable v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>添加权限</b>
      </p>
      <div>
        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">父级ID</h4>
          <p>
            <InputNumber
              readonly
              :max="1000000000"
              :min="0"
              v-model="formData.pid"
              placeholder="请输入..."
              style="width:330px"
            />
          </p>
        </div>
        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">排序</h4>
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
          <h4 class="form-item-title">名称</h4>
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
          <h4 class="form-item-title">前端路由</h4>
          <p>
            <Input
              clearable
              v-model="formData.routeName"
              placeholder="请输入..."
              type="text"
              style="width:330px"
            />
          </p>
        </div>
        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">后端接口</h4>
          <p>
            <Input
              clearable
              v-model="formData.url"
              placeholder="请输入..."
              type="text"
              style="width:330px"
            />
          </p>
        </div>
        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">图标</h4>
          <p>
            <Input
              clearable
              v-model="formData.icon"
              placeholder="请输入..."
              type="text"
              style="width:330px"
            />
          </p>
        </div>
        
        <div class="form-item" flex="cross:center">
          <h4 class="form-item-title">资源类型</h4>
          <p>
            <RadioGroup v-model="formData.type">
                <Radio :label="0">菜单</Radio>
                <Radio :label="1">接口</Radio>
            </RadioGroup>
          </p>
        </div>

        <div style="padding:20px 30px 20px 0" flex="cross:center">
            <span flex-box="0">
            左侧显示 
            <i-switch v-model="formData.side" />
          </span>
          <span flex-box="1" flex="main:center cross:center">
            启用/禁用 
            <i-switch v-model="formData.enabled" />
          </span>
          <span flex-box="0">
            登录后访问 
            <i-switch v-model="formData.auth" />
          </span>
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
  props: ["open","pidNum"],
  data() {
    return {
      isShow: false,
      formData: {
        auth: true, //是否登录后访问
        type: 0,
        side: true,
        enabled:true,
        sort:1
      },
      submitLoading:false
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    _this.formData.pid = _this.pidNum
  },
  methods: {
    save() {
      var _this = this;
      _this.submitLoading = true
      _this.$http.post("/auth/save", _this.formData).then(res => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openAddModel = false;
          _this.formData.collapse = true
          _this.formData.children = []
         _this.formData.id = res.data.data.id
        //   _this.$parent.items.push(_this.formData) 
          _this.$emit('on-change',_this.formData)
        }else{
          _this.submitLoading = false
        }
      });
    },
    cancel() {
      this.$parent.openAddModel = false;
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
  width: 70px;
}
</style>
<style>
.diy-model-body .ivu-modal-body {
  height: 500px;
  overflow-y: auto;
}
</style>

