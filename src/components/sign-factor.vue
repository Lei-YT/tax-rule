<template>
  <div v-cloak>
    <div>
      <div v-for="(vo,index) in items" v-bind:key="`${vo.rule}ff${index}`" flex="cross:center" style="padding:4px 2px">
        <span
          flex="main:center cross:center"
          style="margin-right:5px;width:60px;background-color:#eee;border-radius: 3px;color:#777"
          v-if="index==0"
        >当</span>
        <span style="margin-right:5px" v-else>
          <Select filterable size="small" v-model="vo.type" @on-change="typeChange" placeholder="选择" style="width:60px">
            <Option value="or">or</Option>
            <Option value="and">and</Option>
          </Select>
        </span>
        <Select filterable size="small" v-model="vo.rule" placeholder="选择" style="width:340px">
          <OptionGroup v-for="item in ruleList" :key="item.id" :label="item.name" style="max-width:500px;overflow:auto;">
            <Option v-for="vor in item.items" :disabled="sign===vor.sign" :value="vor.sign"
            v-bind:key="`s${vor.sign}`" style="max-width:500px">
              {{String(vor.title).replace(/"/gm, "'")}}
            </Option>
        </OptionGroup>
        </Select>
        <span style="margin:0 5px"> = </span>
        <Select filterable
          size="small"
          v-model="vo.value"
          placeholder="选择"
          style="width:70px;margin-right:5px"
        >
          <Option value="true">true</Option>
          <Option value="false">false</Option>
        </Select>
          <Icon color="#999" size="16" class="cursor" type="ios-close-circle-outline" @click="del(index)"></Icon>
      </div>

      <div style="height:10px"></div>

      <div>
        <Button
          @click="add"
          icon="md-add"
          size="small"
          type="dashed"
          style="font-size:12px;color:#ff9900"
        >添加</Button>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["items", "sign",'ruleList'],
  data() {
    return {};
  },
  // computed: {
  //   rList(){
  //     const flatten = function(arr) {
  //               let result = [];
  //               _.each(arr,function(item, i){
  //                 result.push(item)
  //                 if (item.items&&item.items.length) {
  //                   result = result.concat(flatten(item.items));
  //                   item.items = []
  //                 }
  //               })
  //               return result;
  //             };

  //     return flatten(JSON.parse(JSON.stringify(this.ruleList)))
  //   }
  // },
  mounted() {},
  methods: {
    add() {
      this.items.push({
          type: "or",
          rule: "",
          value: 'true'
      });
    },
    del(i) {
      //删除如果联合条件
      var _this = this;
      _this.items.splice(i, 1);
    },
    typeChange(val){
      var _this = this;
      _.each(_this.items,function(v){
        v.type = val
      })
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>
