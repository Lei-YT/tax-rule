<template>
  <div v-cloak>
    <Modal
      v-model="isShow"
      width="600"
      :mask-closable="false"
      @on-cancel="cancel"
    >
      <p slot="header">
        <b>更改人员</b>
      </p>
      <div>
        <Table
          @on-selection-change="getIds"
          :loading="tableLoading"
          size="small"
          border
          :columns="columns"
          :data="tableData"
          :height="400"
        >

        <template slot="name" slot-scope="{row}">
          {{row.name}} <span style="color:#999">（{{row.username}}）</span>
        </template>
        
        </Table>
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
import { page } from "@/mixins/mixins";
export default {
  props: ["open", "id"],
  mixins: [page],
  data() {
    return {
      isShow: false,
      submitLoading: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left"
        },
        {
          title: "姓名",
          slot: "name",
          minWidth: 250
        },
        {
          title: "职务",
          key: "postName",
          minWidth: 300
        }
      ],
      tableData: [],
      tableLoading:false,
      saveData:[]
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    _this.getPeople();
  },
  methods: {
    getIds(data){
      var _this = this;
      _this.saveData = []
      _.each(data,function(v){
        _this.saveData.push({
            projectId: _this.id,
            userId: v.id
        })
      })
      
      // console.log(this.saveData)
    },
    getPeople() {
      var _this = this;
      _this.tableLoading = true
      _this.$http
        .get("/item/project/user/" + _this.id)
        .then(res => {
            _this.tableLoading = false;
          if (res) {
            _this.tableData = res.data.data;
            _.each(_this.tableData,function(v){
              if(v.selected){
                v._checked = true
              }
            })
          } 
        });
    },
    save() {
      var _this = this;
      if(!_this.saveData.length){
        _this._N('请选择用户')
        return false
      }
      _this.submitLoading = true;
      _this.$http.post("/item/updateProjectToUser", _this.saveData).then(res => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openPeopleModel = false;
          _this.$parent.getData();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    cancel() {
      this.$parent.openPeopleModel = false;
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

