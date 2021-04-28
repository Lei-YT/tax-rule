<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>选择影像场景</b>
      </p>
      
      <div>
        <div class="form-item">
          <p class="form-item-title">选择场景<span style="color:red;">✲</span></p>
          <p>
            <Select v-model="formData.sceneName" placeholder="请选择...">
              <Option v-for="vo in tableList" :key="vo.id" :value="vo.tableName">{{vo.tableName}}</Option>
            </Select>
          </p>
        </div>
        <div class="form-item">
          <p class="form-item-title">是否复用其他场景规则<span style="color:red;">✲</span></p>
          <p>
            <Select v-model="formData.multiplexingId" placeholder="请选择...">
                <Option :value="0">不复用</Option>
              <Option v-for="vo in list" :key="vo.id" :value="vo.id">{{vo.sceneName}}</Option>
            </Select>
          </p>
        </div>
        <div class="form-item">
          <p class="form-item-title">KEY值<span style="color:red;">✲</span></p>
          <p>
            <Input v-model="formData.key" placeholder="请输入..." type="text" />
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
  props: ["open","list"],
  data() {
    return {
      isShow: false,
      formData: {
        versionId: Number(this.$route.query.versionId),
        key:"",
        sceneName:'',
        multiplexingId:0
      },
      tableList: [],
      submitLoading: false
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    _this.getImageTable()
  },
  methods: {
      getImageTable(){
          var _this = this;
            _this.$http.get("/data/selectListByProjectIdAndType",{
                params:{
                    projectId:this.$route.query.projectId,
                    typeEnum:'影像表'
                }
            }).then(res => {
                if (res) {
                    _this.tableList = res.data.data
                }
            });
      },
    save() {
      var _this = this;

      if (!_this.formData.sceneName) {
        _this._N("请选择场景");
        return false;
      }

      _this.submitLoading = true;
      _this.$http.post("/edition/scene/addImageScene", _this.formData).then(res => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openAddImageModel = false;
          _this.$parent.getData();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    cancel() {
      this.$parent.openAddImageModel = false;
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

