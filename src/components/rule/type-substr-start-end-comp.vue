<template>
  <div v-cloak>
    <div flex="cross:center">
      <span style="margin-right:5px">{{data.name}}（</span>

      <template v-if="!_.isEmpty(data.conditions)">
        <!-- <span class="green">{{data.conditions[0]['name']}}</span> -->
              <variablePoptip :variable="data.conditions[0]" />
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


      <span>
          <InputNumber  size="small" :min="1" :max="10000" v-model="data.start" placeholder="正整数" style="width:60px"/>
        </span>

        <span style="margin:0 5px">到</span>

        <span>
          <InputNumber  size="small" :min="1" :max="10000" v-model="data.end" placeholder="正整数" style="width:60px"/>
        </span>

      <span style="margin-left:5px">）</span>
    </div>
  </div>
</template>

<script>
import typeChange from "@/components/type-change.vue";
import variablePoptip from "@/components/variable-poptip.vue";
export default {
  components: { typeChange,variablePoptip },
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
