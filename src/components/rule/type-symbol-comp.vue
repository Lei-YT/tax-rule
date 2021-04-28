<template>
  <div v-cloak>
    <div flex="cross:center">
      <div style="color:#999;" v-if="data.name=='起始符'"><i style="font-size:10px">( start</i></div>
      <div style="color:#999;" v-if="data.name=='终结符'"><i style="font-size:10px">end ）</i></div>
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