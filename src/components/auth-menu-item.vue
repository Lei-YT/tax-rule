<template>
  <div v-cloak>
    <div class="menu">
      <template v-for="(vo,index) in menus">
        <div class="menu-item" :key="vo.id">
          <p class="title" flex="cross:center">
            <span flex-box="1" flex="cross:center">
              <Icon
                v-if="vo.children&&!vo.children.length"
                type="ios-radio-button-off"
                size="14"
                style="margin-right:3px"
                color="#999"
              />
              <Icon
                v-if="!vo.collapse&&vo.children&&vo.children.length"
                @click="vo.collapse=true"
                size="14"
                style="margin-right:3px"
                type="ios-add-circle-outline"
              />
              <Icon
                v-if="vo.collapse&&vo.children&&vo.children.length"
                @click="vo.collapse=false"
                size="14"
                style="margin-right:3px"
                type="ios-remove-circle-outline"
              />
              {{vo.name}}
              <span style="color:#999;font-size:12px">（{{vo.id}}）</span>
            </span>
            <span flex-box="0">
              <span style="font-size:12px;color:#999;margin-right:10px">{{vo.url}}</span>
              <span style="font-size:12px;color:#999;margin-right:10px">|</span>
              <span style="font-size:12px;color:#999;margin-right:10px">{{vo.routeName}}</span>
              <Tag color="cyan" style="margin-right:10px">{{vo.sort}}</Tag>
              <Tag color="blue" style="margin-right:10px" v-show="vo.type==0">菜</Tag>
              <Tag color="lime" style="margin-right:10px" v-show="vo.type==1">接</Tag>
              <Tag color="green" style="margin-right:10px" v-show="vo.side">左</Tag>
              <Tag color="default" style="margin-right:10px" v-show="!vo.side">右</Tag>
              <Tag color="default" style="margin-right:10px" v-show="!vo.enabled">禁</Tag>
              <Tag color="magenta" style="margin-right:10px" v-show="vo.enabled">启</Tag>
              <span style="font-size:12px">
                <a
                  href="javascript:;"
                  style="margin-right:10px"
                  @click="openAddModel=true;pid=vo.id;currentIndex=index"
                >添加</a>
                <a
                  href="javascript:;"
                  style="margin-right:10px"
                  @click="openEditModel=true;editData=vo;currentIndex=index"
                >编辑</a>
                <a href="javascript:;" @click="del(index,vo.id)">删除</a>
              </span>
            </span>
          </p>
          <template v-if="vo.collapse">
            <MenuItem
              v-if="vo.children&&vo.children.length"
              :menus="vo.children"
              style="padding-left:20px"
            />
          </template>
        </div>
      </template>
    </div>

    <addModel v-if="openAddModel" :pidNum="pid" :open="openAddModel" @on-change="getAddData" />

    <editModel
      v-if="openEditModel"
      :editData="editData"
      :open="openEditModel"
      @on-change="getEditData"
    />
  </div>
</template>

<script>
import addModel from "@/views/auth-menu-add.vue";
import editModel from "@/views/auth-menu-edit.vue";
export default {
  name: "MenuItem",
  components: { addModel, editModel },
  props: ["menus"],
  // inject: ['menuData'],
  data() {
    return {
      openAddModel: false,
      openEditModel: false,
      pid: 0,
      currentIndex: 0,
      editData: {}
    };
  },
  computed: {},
  mounted() {},
  methods: {
    del(index, id) {
      let _this = this;

      if(_this.menus[index]['children'].length){
        _this._N('请先删除下级权限')
        return false
      }

      _this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除选中数据吗</p>",
        onOk: () => {
          _this.$http.delete(`/auth/delete/${id}`).then(res => {
            if (res) {
              _this.menus.splice(index, 1);
            }
          });
        }
      });
      
    },
    getAddData(obj) {
      this.menus[this.currentIndex].children.push(obj);
    },
    getEditData(obj) {
      this.menus[this.currentIndex] = obj;
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.menu {
  padding: 5px 0 0 20px;
  position: relative;
}
.menu-item {
  position: relative;
}

.menu-item .title {
  padding: 7px 7px;
}
.menu-item .title:hover {
  background-color: #f9f9f9;
}

.menu:after {
  position: absolute;
  content: "";
  top: 0px;
  left: 2px;
  bottom: 20px;
  width: 10px;
  border-style: none solid none none;
  border-width: 0.5px;
  border-color: #ccc;
  /* background-color: #eee; */
}
.menu-item:after {
  position: absolute;
  content: "";
  top: 19px;
  left: -8px;
  width: 15px;
  height: 10px;
  border-style: solid none none none;
  border-width: 0.5px;
  border-color: #ccc;
  /* background-color: #eee; */
}
</style>