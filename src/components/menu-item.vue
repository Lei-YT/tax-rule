<template>
  <div v-cloak>
    <template v-for="(v,i) in list">
      <template v-if="v.children&&v.children.length">
        <Submenu :name="v.name" :key="i+232" v-if="!v.hide">
          <template slot="title">
            <div flex="cross:center">
              <Icon :custom="v.icon" style="margin-right:5px" />
              {{v.title}}
            </div>
          </template>
          <menuItem :list="v.children" />
        </Submenu>
      </template>
      <template v-else>
        <MenuItem v-if="!v.hide" :key="i+8432" :name="v.name">
          <div flex="cross:center">
            <Icon :custom="v.icon" style="margin-right:5px" />
            {{v.title}}
          </div>
        </MenuItem>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "menuItem",
  props: ["list"],
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}

</style>