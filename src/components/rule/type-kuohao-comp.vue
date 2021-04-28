<template>
  <div v-cloak>
    <div flex="cross:center">
      <span style="margin-right:5px">{{data.name}}（</span>
        <span v-for="(vo,index) in data.conditions" :key="index">{{vo.name}}，</span>
        <typeChange @on-change="add" >
          <span class="cursor" slot="button">+</span>
        </typeChange>
      <span style="margin-left:5px">）</span>
    </div>
    <!-- <p>{{data}}</p> -->
  </div>
</template>

<script>
import typeChange from "@/components/type-change.vue";
export default {
  components: { typeChange },
  props: ["data"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    add(res) {
      this.data.conditions.push({
        name: res.name,
        conditions: []
      });
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>