<template>
  <div v-cloak>
    <div flex="cross:center">

      <Select
        size="small"
        v-model="items[0].type"
        placeholder="选择"
        style="width:80px;margin-right:5px"
      >
        <Option value="通过">通过</Option>
        <Option value="不通过">不通过</Option>
      </Select>

      <Select
        size="small"
        v-model="items[0].resultType"
        placeholder="选择"
        style="width:100px;margin-right:5px"
      >
        <Option value="预警">预警</Option>
        <Option value="单据报错">单据报错</Option>
        <Option value="影像报错">影像报错</Option>
        <Option value="变量报错">变量报错</Option>
        <Option value="行信息报错">行信息报错</Option>
      </Select>



      <span
       v-if="items.length>0&& items[0].resultType=='变量报错'"
        flex="main:center cross:center"
        style="margin-right:5px;width:100px; height:24px;background-color:#eee;border-radius: 3px;color:#777"
      >
        变量赋值
        <typeChange @on-change="getVariable" type="var" position="bottom-start">
          <span class="cursor blue" slot="button">
             <Icon
            color="#999"
            size="16"
            class="cursor"
            type="ios-add-circle-outline"
            style="margin-left:5px"
          ></Icon>
          </span>
        </typeChange>
      </span>


      <Input
        placeholder="不通过时话术"
        size="small"
        type="text"
        v-model="items[0].desc"
        style="margin-right:5px;width:350px"
      />


        <Icon @click="del"  color="#999" size="16" class="cursor" type="ios-close-circle-outline" />

    </div>

<div style="height:10px"></div>


<template v-if="items.length>0&& items[0].resultType=='变量报错'">
<Tag closable @on-close="delVoluation(index)" color="default" type="border" v-for="(vo,index) in items[0]['voluation']" :key="index">{{vo.name}}</Tag>
</template>



  </div>
</template>

<script>
import typeChange from "@/components/type-change.vue";
import Bus from '@/libs/bus.js';
export default {
  components: { typeChange },
  props: ["items"],
  data() {
    return {};
  },
  computed: {},

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
    delVoluation(index){
      this.items[0]['voluation'].splice(index, 1);
    },
    getVariable(res){
      this.items[0]["voluation"].push(res)
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>
