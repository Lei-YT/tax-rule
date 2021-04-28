<template>
  <div v-cloak>
    <div flex>
      <div style="margin-right:5px">{{data.name}}</div>
      <div class="b-tree">
        <div class="b-tree-item" flex="cross:center">
          <span>起始日期：</span>
            <span style="margin-right:5px">
              <Select v-model="data.date1.type" size="small" style="width:90px" placeholder="请选择日期变量或日期">
                <Option value="1">变量</Option>
                <Option value="2">输入</Option>
                <Option value="3">当前日期</Option>
              </Select>
            </span>
            <span v-if="data.date1.type=='1'">
                <typeChange @on-change="getVariable" type="var" position="bottom-start" >
                  <span class="cursor blue" slot="button">变量：</span>
                </typeChange>
            </span>
            <span v-if="data.date1.type=='1'" class="green">
            {{data.date1.variable.name||"____"}}
            </span>
            <span v-if="data.date1.type=='2'">
                <DatePicker :value="data.date1.value" size="small" @on-change="data.date1.value = $event" type="date" placeholder="选择日期..." style="width: 115px"></DatePicker>
            </span>
        </div>
        <div class="b-tree-item" flex="cross:center">
          <span>目标日期：</span>
          <span style="margin-right:5px">
            <Select v-model="data.date2.type" size="small" style="width:90px" placeholder="请选择日期变量或日期"> 
              <Option value="1">变量</Option>
              <Option value="2">输入</Option>
              <Option value="3">当前日期</Option>
            </Select>
          </span>
          <span v-if="data.date2.type=='1'">
              <typeChange @on-change="getDate2Variable" type="var" position="bottom-start" >
                <span class="cursor blue" slot="button">变量：</span>
              </typeChange>
          </span>
          <span v-if="data.date2.type=='1'" class="green">
                {{data.date2.variable.name||"____"}}
          </span>
          <span v-if="data.date2.type=='2'">
              <DatePicker size="small" :value="data.date2.value" @on-change="data.date2.value = $event" type="date" placeholder="选择日期..." style="width: 115px"></DatePicker>
          </span>
        </div>
        <div class="b-tree-item" flex="cross:center">
          <span>截止日期：</span>
          <span style="margin-right:5px">
            <Select v-model="data.date3.type" size="small" style="width:90px" placeholder="请选择日期变量或日期"> 
              <Option value="1">变量</Option>
              <Option value="2">输入</Option>
              <Option value="3">当前日期</Option>
            </Select>
          </span>
          <span v-if="data.date3.type=='1'">
              <typeChange @on-change="getDate3Variable" type="var" position="bottom-start" >
                <span class="cursor blue" slot="button">变量：</span>
              </typeChange>
          </span>
          <span v-if="data.date3.type=='1'" class="green">
                {{data.date3.variable.name||"____"}}
          </span>
          <span v-if="data.date3.type=='2'">
              <DatePicker size="small" :value="data.date3.value" @on-change="data.date3.value = $event" type="date" placeholder="选择日期..." style="width: 115px"></DatePicker>
          </span>
        </div>
      </div>
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
      this.data.date1.variable = res;
    },
    getDate2Variable(res) {
      this.data.date2.variable = res;
    },
    getDate3Variable(res) {
      this.data.date3.variable = res;
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>