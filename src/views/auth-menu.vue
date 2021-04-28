<template>
  <div :style="'height:'+divHeight+'px;padding:0 20px;overflow-y:auto'">
    <div class="breadcrumb-buttons-bar">
      <Button icon="md-add" type="warning" size="small" @click="openAddModel=true">添加权限</Button>
    </div>

    <template v-if="items.length">
      <div style="height:15px"></div>

      <div flex>
        <span flex-box="1">
          <Button type="info" @click="refresh" size="small" :loading="refreshLoading">刷新数据</Button>
        </span>
        <span flex-box="0" style="margin-right:15px">
          <a href="javascript:;" @click="loopData(items,true)" style="color:#666">+ 全部展开</a>
          <a
            href="javascript:;"
            @click="loopData(items,false)"
            style="margin-left:10px;color:#666"
          >- 全部收缩</a>
        </span>
      </div>

      <div class="menu-box">
        <MenuItem :menus="items" style="margin-left:-37px" />
      </div>
    </template>

    <template v-else>
      <div style="padding:20px">加载中...</div>
    </template>


    <addModel v-if="openAddModel" :pidNum="0" :open="openAddModel" @on-change="getAddData" />


  </div>
</template>

<script>
import { GetHeight } from "@/mixins/mixins";
import MenuItem from "@/components/auth-menu-item.vue";
import addModel from "@/views/auth-menu-add.vue";
export default {
  components: { MenuItem, addModel },
  mixins: [GetHeight],

  data() {
    return {
      items: [],
      openAddModel: false,
      refreshLoading:false
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      _this.$http("/auth/tree").then(res => {
        if (res) {
          _this.loopData(res.data.data, false);
          _this.items = res.data.data;
        }
      });
    },
    refresh() {
      var _this = this;
      _this.refreshLoading = true
      _this.$http("/auth/refresh").then(res => {
        _this.refreshLoading = false
        if (res) {
          // _this.loopData(res.data.data, false);
          if(res.data.data){
               _this._M('刷新成功')
              _this.items = res.data.data;
          }else{
              _this._N('没有可刷新数据')
          }
        }
      });
    },
    loopData(arr, value) {
      let _this = this;
      _.each(arr, function(v, i) {
        v.collapse = value;
        if (v.children && v.children.length) {
          _this.loopData(v.children, value);
        }
      });
    },
    getAddData(obj) {
      this.items.push(obj);
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.menu-box {
  /* position: relative; */
  padding: 10px;
  overflow-x: hidden;
  /* height: 300px; */
}
</style>