<template>
  <div v-cloak>

    <div flex="cross:center">
      <span style="margin-right:5px">{{data.name}}（</span>

          <template v-if="!_.isEmpty(data.conditions[0])">
          <!-- <span class="green">{{data.conditions[0].name}}</span> -->
              <variablePoptip :variable="data.conditions[0]" />
          <Icon
            @click="del(0)"
            color="#999"
            size="14"
            class="cursor"
            type="ios-remove-circle-outline"
          />
          </template>
          <typeChange v-if="_.isEmpty(data.conditions[0])" @on-change="change(0,$event)" type="var" position="bottom-start">
            <span class="cursor blue" slot="button">选择目标变量</span>
          </typeChange>
          ，
          <template v-if="!_.isEmpty(data.conditions[1])">
          <!-- <span class="green">{{data.conditions[1].name}}</span> -->
          <variablePoptip :variable="data.conditions[1]" />
          <Icon
            @click="del(1)"
            color="#999"
            size="14"
            class="cursor"
            type="ios-remove-circle-outline"
          />
          </template>
          <typeChange v-if="_.isEmpty(data.conditions[1])" @on-change="change(1,$event)" type="var" position="bottom-start">
            <span class="cursor blue" slot="button">选择集合变量</span>
          </typeChange>
          ，
          <template v-if="!_.isEmpty(data.conditions[2])">
          <!-- <span class="green">{{data.conditions[2].name}}</span> -->
          <variablePoptip :variable="data.conditions[2]" />
          <Icon
            @click="del(2)"
            color="#999"
            size="14"
            class="cursor"
            type="ios-remove-circle-outline"
          />
          </template>
          <typeChange v-if="_.isEmpty(data.conditions[2])" @on-change="change(2,$event)" type="var" position="bottom-start">
            <span class="cursor blue" slot="button">选择集合筛选变量</span>
          </typeChange>

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
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    change(i,val) {
      this.data.conditions.splice(i,1,val)
    },
    del(i) {
      this.data.conditions.splice(i,1,{})
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>
