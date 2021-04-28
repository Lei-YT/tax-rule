<template>
  <div v-cloak>
    <Modal transfer :z-index="10000" v-model="isShow" width="460" :mask-closable="false" @on-cancel="cancel">
      <p slot="header">
        <b>添加规则页</b>
      </p>
      <div>
        <div class="form-item">
            <h4 class="form-item-title">名称</h4>
            <p><Input v-model="name" placeholder="请输入..." type="text" /></p>
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
import md5 from "md5";
export default {
  props:['open'],
  data() {
    return {
        isShow : false,
        name:''
    };
  },
  computed: {},
  mounted() {
      var _this = this;
      _this.isShow = _this.open
  },
  methods: {
      save(){
        var _this = this;
        if(_this.name==''){
          _this._N('请输入名称')
          return false
        }
        _this.isShow = false
        _this.$parent.addYeModel = false
        _this.$parent.allData.push({
            id:md5(Math.random()),
            name:_this.name,
            items:[]
        })
      },
      cancel(){
          this.$parent.addYeModel = false
      }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.form-item{
    /* border-bottom: #eee 1px solid; */
    padding: 10px 0;
}
.form-item .form-item-title{
    margin-bottom: 5px;
    overflow: hidden;
}

</style>
