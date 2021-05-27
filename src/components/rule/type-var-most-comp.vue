<template>
  <div v-cloak>

<div flex v-if="data.conditions.length>1">
<span style="margin-right:6px">{{data.name}}</span>
    <div class="b-tree" >

      <div class="b-tree-item" flex="cross:center" v-for="(vo,index) in data.conditions" :key="index">
        <Icon
            @click="del(index)"
            color="#999"
            size="14"
            class="cursor"
            type="ios-remove-circle-outline"
            style="margin-right:5px"
          />
        <!-- <span style="color:#999">[{{vo.tableName}}]</span> -->
        <!-- <span class="green">{{vo.name}}</span> -->
                <variablePoptip :variable="vo" />
      </div>

      <div class="b-tree-item">
      <typeChange @on-change="add" type="var" position="bottom-start" style="margin-left:3px">
        <span class="cursor blue" slot="button">+</span>
      </typeChange>
      </div>

    </div>
</div>

    <div flex="cross:center" v-if="data.conditions.length<=1">
      <span style="margin-right:5px">{{data.name}}（</span>
      <template v-if="data.conditions.length">
        <span v-for="(vo,index) in data.conditions" :key="index" flex="cross:center">
          <!-- <span style="color:#999">[{{vo.tableName}}]</span> -->
          <!-- <span class="green">{{vo.name}}</span> -->
              <variablePoptip :variable="vo" />
          <Icon
            @click="del(index)"
            color="#999"
            size="14"
            class="cursor"
            type="ios-remove-circle-outline"
          />，
        </span>
      </template>
      <span v-if="!data.conditions.length" class="hui" style="margin-right:5px">请添加变量</span>
      <typeChange @on-change="add" type="var" position="bottom-start">
        <span class="cursor blue" slot="button">+</span>
      </typeChange>
      <span style="margin-left:5px">）</span>
    </div>


  </div>
</template>

<script>
import typeChange from "@/components/type-change.vue";
import variablePoptip from "@/components/variable-poptip.vue";
export default {
  components: { typeChange ,variablePoptip},
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
