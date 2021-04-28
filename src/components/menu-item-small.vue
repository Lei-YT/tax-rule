<template>
  <div v-cloak>
    <ul class="side-small-list">
      <template v-for="(v,i) in list">
        <li v-if="v.children&&v.children.length" :key="i+5342">
          <Poptip padding="0" trigger="hover" placement="right-start">
            {{v.title}}
            <span>
              <Icon type="ios-arrow-forward"></Icon>
            </span>
            <div slot="content">
              <menuItemSmall :list="v.children" />
            </div>
          </Poptip>
        </li>

        <li @click="toLink(v.name)" v-else flex="cross:center" :key="i+342">
          <span>{{v.title}}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "menuItemSmall",
  props: ["list"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    
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
  border-bottom: #eee 0.5px solid;
  padding: 10px 0;
  cursor: pointer;
}
.side-small-list li:nth-last-child(1) {
  border-bottom: none;
}
</style>