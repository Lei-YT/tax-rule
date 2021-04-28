<template>
  <div v-cloak flex>
    <div ref="wrap">
      <div class="dom-tree-wrap" style="margin-left:20px;">
        <div class="dom-tree-ul">
          <vuedraggable :list="items" :animation="350" handle=".drag-handle">
            <transition-group>
              <div
                class="dom-tree-li"
                v-for="(vo,index) in items"
                :key="index"
                style="padding:4px 2px"
              >
                <div v-if="vo.actionType==='条件'">
                  <div flex>
                    <Icon
                      type="ios-menu"
                      size="14"
                      style="cursor:move;margin:3px 5px 0  0"
                      class="drag-handle"
                    />
                    <Icon
                      @click="del(index)"
                      style="margin:3px 5px 0  0"
                      color="#999"
                      size="16"
                      class="cursor"
                      type="ios-close-circle-outline"
                    />
                    <type :data="vo" />
                  </div>
                </div>

                <div flex="cross:center" v-if="vo.actionType==='联合条件'">
                  <Icon
                    type="ios-menu"
                    size="14"
                    style="cursor:move;margin:0 5px 0  0"
                    class="drag-handle"
                  />
                  <div style="margin-right:5px">
                    <Select v-model="vo.type" size="small">
                      <Option value="并且">并且</Option>
                      <Option value="或者">或者</Option>
                    </Select>
                  </div>
                  <div>
                    <Poptip padding="0" transfer trigger="click" placement="right-start">
                      <Icon color="#999" size="16" class="cursor" type="ios-add-circle-outline" />
                      <div slot="content">
                        <ul class="side-small-list">
                          <li @click="addConditions(index)">添加条件</li>
                          <li @click="addUnites(index)">添加联合条件</li>
                          <li @click="copyData(vo.conditions)">复制</li>
                          <li @click="pasteData(index)">粘贴</li>
                        </ul>
                      </div>
                    </Poptip>
                    <Icon
                      @click="del(index)"
                      style="margin-left:3px"
                      color="#999"
                      size="16"
                      class="cursor"
                      type="ios-close-circle-outline"
                    />
                  </div>
                </div>

                <unitesItem
                  :items="vo.conditions"
                  v-if="vo.actionType==='联合条件'&&vo.conditions.length"
                  style="margin-left:20px"
                />
              </div>
            </transition-group>
          </vuedraggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import vuedraggable from "vuedraggable";
import type from "@/components/type.vue";
export default {
  name: "unitesItem",
  components: { type, vuedraggable },
  props: ["items"],
  data() {
    return {};
  },
  computed: {},
  mounted() {
    var _this = this;
  },
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
      // _this.items.splice(i, 1);
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "你确定要删除吗?",
        onOk: () => {
          _this.items.splice(i, 1);
        },
      });
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
      this.$store.commit("copyData", data);
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
  border-bottom: #eee 1px solid;
  padding: 10px 0;
  cursor: pointer;
}
.side-small-list li:nth-last-child(1) {
  border-bottom: none;
}
</style>