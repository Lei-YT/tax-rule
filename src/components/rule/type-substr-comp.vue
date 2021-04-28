<template>
  <div v-cloak>
    <div flex="cross:center">
      <span style="margin-right:5px">{{data.name}}（</span>

      <template v-if="!_.isEmpty(data.conditions)">
        <span class="green">{{data.conditions[0]['name']}}</span>
        <Icon
          @click="del(0)"
          color="#999"
          size="14"
          class="cursor"
          type="ios-remove-circle-outline"
        />
      </template>

      <span v-if="_.isEmpty(data.conditions)">
        <typeChange @on-change="getVariable" type="var" position="bottom-start">
          <span class="cursor blue" slot="button">选择变量</span>
        </typeChange>
      </span>
      ，
      <span>截取：</span>

      <span v-if="data.name=='截取X之后的值'||data.name=='截取X之前的值'">
          <Input size="small" type="text" v-model="data.value" placeholder="字符串" style="width:100px"/>
      </span>

      <span v-if="data.name=='截第X位之后的值'||data.name=='截第X位之前的值'">
          <InputNumber  size="small" :min="1" :max="10000" v-model="data.value" placeholder="正整数" style="width:100px"/>
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
    getVariable(res) {
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