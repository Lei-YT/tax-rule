<template>
  <div v-cloak>
    <div flex="cross:center">
      <span style="margin-right:5px">{{data.name}}（</span>

     <span v-if="data.name=='日期'">
         <DatePicker :value="data.value" size="small" @on-change="data.value = $event" type="date" placeholder="选择日期..." style="width: 140px"></DatePicker>
     </span>

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