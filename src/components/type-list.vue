<template>
  <div v-cloak>
    <ul class="side-small-list">
      <template v-for="(v,i) in items">
        
        <li v-if="v.children&&v.children.length" :key="i+5342">
          <Poptip  padding="0" trigger="hover" placement="right-start">
            {{v.name}}
            <span>
              <Icon type="ios-arrow-forward"></Icon>
            </span>
            <div slot="content" style="max-height:400px;overflow-y:auto">
              <typeList :items="v.children" />
            </div>
          </Poptip>
        </li>

        <li v-else flex="cross:center" :key="i+342" @click="click(v)">
          <span>{{v.name}}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import Bus from "@/libs/bus.js";
export default {
  name: "typeList",
  props: ["items"],
  methods: {
      click(data){
        Bus.$emit('getTypeValue', data); 
        // this.getTypeValue(data)
      }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.side-small-list {
  list-style: none;
  padding: 0 15px;
}
.side-small-list li {
  border-bottom: #eee 1px solid;
  padding: 5px 0;
  cursor: pointer;
  font-size: 14px;
}
.side-small-list li:nth-last-child(1) {
  border-bottom: none;
}
</style>