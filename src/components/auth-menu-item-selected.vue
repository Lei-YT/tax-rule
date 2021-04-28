<template>
  <div v-cloak>
    <div class="menu">
      <template v-for="(vo,index) in menus">
        <div class="menu-item" :key="vo.id">
          <p class="title" flex="cross:center">
            <span flex-box="1" flex="cross:center">
              <Checkbox v-model="vo.selected" @on-change="change($event,vo.id)" />
              {{vo.name}}
              <span style="color:#999;font-size:12px">（{{vo.id}}）</span>
            </span>
            <span flex-box="0">
              <Tag color="green" style="margin-right:10px" v-show="vo.type==0">菜</Tag>
              <Tag color="cyan" style="margin-right:10px" v-show="vo.type==1">接</Tag>
              <Tag color="default" style="margin-right:10px" v-show="!vo.enabled">禁</Tag>
              <Tag color="orange" style="margin-right:10px" v-show="vo.enabled">启</Tag>
            </span>
          </p>
          <template>
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
import Bus from "@/libs/bus.js";
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
    change(val,id) {
        Bus.$emit('getMenuIds', {val:val,id:id});
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