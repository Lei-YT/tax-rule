<template>
  <div :style="'height:'+divHeight+'px;padding:0 20px;overflow-y:auto'">
    <div class="breadcrumb-buttons-bar">
      <!-- <Button icon="md-add" type="warning" size="small" @click="openAddModel=true">添加权限</Button> -->
      <Button icon="ios-arrow-back" type="default" size="small" @click="$router.go(-1)">返回</Button>
    </div>


<template v-if="items.length">

    <div class="menu-box">
      <MenuItem :menus="items" style="margin-left:-37px" @on-change="getIds" />
    </div>
    <div style="height:10px"></div>
    <Button
      :loading="submitLoading"
      type="success"
      @click="save"
      style="width:100px;margin-left:20px"
    >提交</Button>
    <Button type="default" @click="$router.go(-1)" style="width:100px;margin-left:20px">返回</Button>
    <div style="height:30px"></div>

</template>


<template v-else>
    <div style="padding:20px">
        加载中...
    </div>
</template>


  </div>
</template>

<script>
import Bus from "@/libs/bus.js";
import { GetHeight } from "@/mixins/mixins";
import MenuItem from "@/components/auth-menu-item-selected.vue";
export default {
  components: { MenuItem },
  mixins: [GetHeight],

  data() {
    return {
      items: [],
      menus: [],
      selectIds: [],
      submitLoading: false
    };
  },
  computed: {},
  mounted() {
    Bus.$on("getMenuIds", data => {
      this.getIds(data);
    });
    this.getMenu();
  },
  methods: {
    getIds(data) {
        var _this = this;
      if(data.val){
          _this.menus.push(data.id)
      }else{
         _this.menus = _.remove(_this.menus, function(v) {
              console.log(v,data.id)
             return v != data.id;
          });
      }
    },
    getMenu() {
      var _this = this;
      _this.$http.get("/post/auth/" + _this.$route.query.id).then(res => {
        if (res) {
          _this.getData();
          _this.menus = res.data.data;
        }
      });
    },
    getData() {
      var _this = this;
      _this.$http.get("/auth/tree").then(res => {
        if (res) {
          _this.loopData(res.data.data);
          _this.items = res.data.data;
        }
      });
    },
    loopData(arr) {
      let _this = this;
      _.each(arr, function(v, i) {
        if (_.indexOf(_this.menus, v.id) != -1) {
          v.selected = true;
        } else {
          v.selected = false;
        }
        if (v.children && v.children.length) {
          _this.loopData(v.children);
        }
      });
    },
    save() {
      var _this = this;
      _this.submitLoading = true;
      _this.$http.post("/post/auth",{
          postId:Number(_this.$route.query.id),
          authIds:_this.menus
      }).then(res=> {
        if (res) {
          _this._M('提交成功')
          _this.$router.go(-1)
        }else{
            _this.submitLoading = false
        }
      });
    },
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