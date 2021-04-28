<template>
  <div v-cloak>
    <div flex="cross:center">
      <span>{{data.name}}（ </span>
      <span style="margin-right:5px;margin-left:5px">
        <Select v-model="data.type" size="small" style="width:70px">
          <Option value="1">变量</Option>
          <Option value="2">输入</Option>
        </Select>
      </span>
      <span v-if="data.type=='1'">
          <typeChange @on-change="getVariable" type="var" position="bottom-start" >
            <span class="cursor blue" slot="button">变量：</span>
          </typeChange>
      </span>
      <span v-if="data.type=='1'" class="green">
      {{data.variable.name||"____"}}
      </span>
      <span v-if="data.type=='2'">
          <Input size="small" v-model="data.value"  type="text" placeholder="请输入..." style="width: 120px" />
      </span>
      <span style="margin-left:5px"> ）</span>
    </div>
  </div>
</template>

<script>
import typeChange from "@/components/type-change.vue";
export default {
  components: {typeChange},
  props: ["data"],
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