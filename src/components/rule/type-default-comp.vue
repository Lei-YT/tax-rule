<template>
  <div v-cloak>
    {{data.name}}
  </div>
</template>
<script>
export default {
  props: ["data"],
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>