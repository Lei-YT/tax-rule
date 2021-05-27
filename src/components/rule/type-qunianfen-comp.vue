<template>
  <div v-cloak>
    <div flex="cross:center">
      <span style="margin-right:5px">{{data.name}}（</span>
      <span>目标日期：</span>
      <span style="margin-right:5px">
        <Select v-model="data.dateType" size="small" style="width:90px" placeholder="请选择日期变量或日期">
          <Option value="1">变量</Option>
          <Option value="2">输入</Option>
          <Option value="3">当前日期</Option>
        </Select>
      </span>
      <span v-if="data.dateType=='1'">
          <typeChange @on-change="getVariable" type="var" position="bottom-start" >
            <span class="cursor blue" slot="button">变量：</span>
          </typeChange>
      </span>
      <!-- <span v-if="data.dateType=='1'" class="green">
      {{data.variable.name||"____"}}
      </span> -->
            <variablePoptip v-if="data.dateType=='1'" :variable="data.variable" />
      <span v-if="data.dateType=='2'">
          <DatePicker size="small" :value="data.value" @on-change="data.value = $event" type="date" placeholder="选择日期..." style="width: 120px"></DatePicker>
      </span>
      <span style="margin-left:5px">）</span>
    </div>
  </div>
</template>

<script>
import typeChange from "@/components/type-change.vue";
import variablePoptip from "@/components/variable-poptip.vue";
export default {
  components: {typeChange,variablePoptip},
  props: ["data"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
      getVariable(res){
          this.data.variable = res
      }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>
