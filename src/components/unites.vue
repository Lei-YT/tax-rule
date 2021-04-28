<template>
  <div v-cloak flex>
    <div ref="wrap">
      <div v-for="(vo,index) in items" :key="index" style="padding:4px 2px">
        <div flex="cross:center" v-if="vo.actionType==='联合条件'">
          <div style="margin-right:5px">
            <Select v-model="vo.type" size="small">
              <Option value="并且">并且</Option>
              <Option value="或者">或者</Option>
            </Select>
          </div>
          <div>
            <Poptip padding="0" transfer trigger="click" placement="right-start">
              <Icon color="#999" size="16" class="cursor" type="ios-add-circle-outline"></Icon>
              <div slot="content">
                <ul class="side-small-list">
                  <li @click="addConditions(index)">添加条件</li>
                  <li @click="addUnites(index)">添加联合条件</li>
                  <li @click="copyData(vo.conditions)">复制</li>
                  <li @click="pasteData(index)">粘贴</li>
                </ul>
              </div>
            </Poptip>

            <Poptip
              transfer
              confirm
              title="你确定要删除吗?"
              placement="right"
              @on-ok="del(index)"
              v-if="index!=0"
            >
              <Icon color="#999" size="16" class="cursor" type="ios-close-circle-outline"></Icon>
            </Poptip>
          </div>
        </div>

        <unitesItem :items="vo.conditions" />

      </div>
    </div>

    
  </div>
</template>

<script>
import Bus from "@/libs/bus.js";
import md5 from "md5";
import unitesItem from "@/components/unites-item.vue";
export default {
  name: "Unites",
  components: { unitesItem },
  props: ["items"],
  data() {
    return {
      spinShow: false,
    };
  },
  computed: {},
  // mounted() {
  //   var _this = this;
  //   this.$nextTick(function () {
  //     _this.spinShow = false;
  //     console.log("gogogo");
  //   });
  // },
  // beforeCreate() {
  //   this.spinShow = true;
  //   console.log("lalala");
  // },
  methods: {
    add() {
      //添加如果联合条件
      var _this = this;
      _this.items.push({
        actionType: "联合条件",
        type: "或者",
        conditions: [],
      });
    },
    del(i) {
      //删除如果联合条件
      var _this = this;
      _this.items.splice(i, 1);
      // _this.loopItems();
    },
    addConditions(index) {
      var _this = this;
      _this.items[index]["conditions"].push({
        actionType: "条件",
        type: "请选择类型",
        name: "",
        conditions: [],
      });
      _this.$refs.wrap.click();
      _this._M("添加成功");
    },
    addUnites(index) {
      var _this = this;
      _this.items[index]["conditions"].push({
        actionType: "联合条件",
        type: "或者",
        conditions: [],
      });
      _this.$refs.wrap.click();
      _this._M("添加成功");
    },
    copyData(data) {
      //复制
      this.$store.commit("copyData", JSON.parse(JSON.stringify(data)));
      this._M("复制成功");
      this.$refs.wrap.click();
    },
    pasteData(index) {
      //粘贴
      //  this.items[index]['conditions'].push(this.$store.state.copyData)
      var _this = this;
      _.each(this.$store.state.copyData, function (v) {
        _this.items[index]["conditions"].push(v);
      });
      _this.$refs.wrap.click();
      _this._M("粘贴成功");
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.side-small-list {
  list-style: none;
  padding: 0 15px;
}
.side-small-list li {
  border-bottom: #eee 0.5px solid;
  padding: 10px 0;
  cursor: pointer;
}
.side-small-list li:nth-last-child(1) {
  border-bottom: none;
}
</style>