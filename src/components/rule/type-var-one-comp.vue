<template>
  <div v-cloak>


    <div flex="cross:center">
      <span style="margin-right:5px">{{data.name}}（</span>
      <template v-if="data.conditions.length">
        <span v-for="(vo,index) in data.conditions" :key="index" flex="cross:center">
          <!-- <span style="color:#999">[{{vo.tableName}}]</span> -->
          <span class="green">{{vo.name}}</span>
          <Icon
            @click="del(index)"
            color="#999"
            size="14"
            class="cursor"
            type="ios-remove-circle-outline"
          />
        </span>
      </template>
      <typeChange v-if="!data.conditions.length" @on-change="add" type="var" position="bottom-start">
        <span class="cursor blue" slot="button">选择变量</span>
      </typeChange>
      <span style="margin-left:5px">）</span>
    </div>


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
      this.data.conditions.push(res);
    },
    del(i) {
      this.data.conditions.splice(i, 1);
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>
