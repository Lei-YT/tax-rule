<template>
  <div v-cloak>
    <div flex="cross:center">

      <span
        flex="main:center cross:center"
        class="span-text-bar"
        style="margin-right:5px;width:60px;"
      >如果为</span>

      <Select
        size="small"
        v-model="items[0].value"
        placeholder="选择"
        style="width:70px;margin-right:5px"
      >
        <Option value="true">true</Option>
        <Option value="false">false</Option>
      </Select>

      <span
        flex="main:center cross:center"
        class="span-text-bar"
        style="margin-right:5px;width:90px;"
      >则终止执行</span>

      <Icon @click="del"  color="#999" size="16" class="cursor" type="ios-close-circle-outline" />


    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["items"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    del() {
      var _this = this;
      _this.$Modal.confirm({
        title: "温馨提示",
        content: "你确定要删除吗?",
        onOk: () => {
          _this.items.splice(0, 1);
        },
      });
    },
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>