<template>
  <div v-cloak>
    <div flex="cross:center">
      <span>{{data.name}}（最大日期：</span>
      <span style="margin-right:5px">
      </span>
      <span v-if="data.date1.type=='1'">
          <typeChange @on-change="getVariable" type="var" position="bottom-start" >
            <span class="cursor blue" slot="button">变量：</span>
          </typeChange>
      </span>
      <!-- <span v-if="data.date1.type=='1'" class="green">
      {{data.date1.variable.name||"____"}}
      </span> -->
      <variablePoptip v-if="data.date1.type=='1'" :variable="data.date1.variable" />

      <span v-if="data.date1.type=='2'">
          <DatePicker :value="data.date1.value" size="small" @on-change="data.date1.value = $event" type="date" placeholder="选择日期..." style="width: 115px"></DatePicker>
      </span>，
      <span>最小日期：</span>
      <span style="margin-right:5px">
      </span>
      <span v-if="data.date2.type=='1'">
          <typeChange @on-change="getDate2Variable" type="var" position="bottom-start" >
            <span class="cursor blue" slot="button">变量：</span>
          </typeChange>
      </span>
      <!-- <span v-if="data.date2.type=='1'" class="green">
            {{data.date2.variable.name||"____"}}
      </span> -->
      <variablePoptip v-if="data.date2.type=='1'" :variable="data.date2.variable" />
      <span v-if="data.date2.type=='2'">
          <DatePicker size="small" :value="data.date2.value" @on-change="data.date2.value = $event" type="date" placeholder="选择日期..." style="width: 115px"></DatePicker>
      </span>
      <span>）</span>
    </div>
  </div>
</template>

<script>
import typeChange from "@/components/type-change.vue";
import variablePoptip from "@/components/variable-poptip.vue";

export default {
  components: {typeChange, variablePoptip},
  props: ["data"],
  methods: {
      getVariable(res){
          this.data.date1.variable = res
      },
      getDate2Variable(res){
          this.data.date2.variable = res
      }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>
