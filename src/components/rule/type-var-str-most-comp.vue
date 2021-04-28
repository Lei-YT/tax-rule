<template>
  <div v-cloak>


    <div flex v-if="data.conditions.length>1">

      <div>{{data.name}}</div>
      <div class="b-tree">
          <div class="b-tree-item" v-for="(vo,index) in data.conditions" :key="index" flex="cross:center">
            <Icon
            @click="del(index)"
            color="#999"
            size="14"
            class="cursor"
            type="ios-remove-circle-outline"
            style="margin-right:5px"
          />
          <span :key="index" flex="cross:center">
          <span style="margin-right:5px;margin-left:5px">
            <Select v-model="vo.type" size="small" style="width:70px" placeholder="请选择日期变量或日期">
              <Option value="1">变量</Option>
              <Option value="2">输入</Option>
            </Select>
          </span>
          <span v-if="vo.type=='1'">
            <typeChange @on-change="getVariable(index,$event)" type="var" position="bottom-start">
              <span class="cursor blue" slot="button">变量：</span>
            </typeChange>
          </span>
          <span v-if="vo.type=='1'" class="green">{{vo.variable.name||"____"}}</span>
          <span v-if="vo.type=='2'">
            <Input
              size="small"
              v-model="vo.value"
              type="text"
              placeholder="请输入..."
              style="width: 120px"
            />
          </span>
        </span>
         
          </div>
          <div class="b-tree-item"><span class="cursor blue" slot="button" @click="add" style="margin-left:3px">+</span></div>
      </div>

    </div>





    <div flex="cross:center" v-if="data.conditions.length<2">
      <span>{{data.name}}（</span> 

      <template v-for="(vo,index) in data.conditions">
        <span :key="index" flex="cross:center">
          <span style="margin-right:5px;margin-left:5px">
            <Select v-model="vo.type" size="small" style="width:70px" placeholder="请选择日期变量或日期">
              <Option value="1">变量</Option>
              <Option value="2">输入</Option>
            </Select>
          </span>
          <span v-if="vo.type=='1'">
            <typeChange @on-change="getVariable(index,$event)" type="var" position="bottom-start">
              <span class="cursor blue" slot="button">变量：</span>
            </typeChange>
          </span>
          <span v-if="vo.type=='1'" class="green">{{vo.variable.name||"____"}}</span>
          <span v-if="vo.type=='2'">
            <Input
              size="small"
              v-model="vo.value"
              type="text"
              placeholder="请输入..."
              style="width: 120px"
            />
          </span>
          <Icon
            @click="del(index)"
            color="#999"
            size="14"
            class="cursor"
            type="ios-remove-circle-outline"
            />
          ，
        </span>
      </template>

      <span v-if="!data.conditions.length" class="hui" style="margin-right:5px;margin-left:5px">请添加变量或值</span>
      <span class="cursor blue" slot="button" @click="add" style="margin-right:5px">+</span>

      <span>）</span>
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
    getVariable(index,res) {
      this.data.conditions[index].variable = res;
    },
    add() {
      this.data.conditions.push({
        type:'1',//1为变量 2为手动输入
        variable:{},//变量
        value:''//手工输入值
      });
    },
    del(i) {
      this.data.conditions.splice(i, 1);
    },
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>