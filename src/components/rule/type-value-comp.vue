<template>
  <div v-cloak>
    <div flex="cross:center">
      <span style="margin-right:5px">{{data.name}}（</span>


     <template v-if="data.name=='值'">
       <Select v-model="data.type" size="small" style="width:80px;margin-right:5px" placeholder="请选择日期变量或日期">
          <Option value="字符串">字符串</Option>
          <Option value="数字">数字</Option>
        </Select>
         <Input v-if="data.type=='字符串'" v-model="data.value" size="small" clearable type="text" placeholder="字符串" style="width: 150px" />
         <InputNumber v-if="data.type=='数字'" v-model="data.number" size="small" clearable type="text" placeholder="数字" style="width: 150px" />
     </template>

     <span style="margin-left:5px">）</span>

    </div>
  </div>
</template>

<script>
import typeChange from "@/components/type-change.vue";
export default {
  components: { typeChange },
  props: ["data"],
  methods: {
    
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>