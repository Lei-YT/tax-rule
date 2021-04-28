<template>
  <div v-cloak>
    <Menu
      ref="menu"
      v-if="side"
      @on-select="toLink"
      width="240px"
      :active-name="activeName"
      :open-names="openMenus"
    >
      <menuItem :list="menuList" />
    </Menu>

    <div v-if="!side" class="small-side">
      <template v-for="(v,i) in menuList">
        <Poptip
          :key="i+3352"
          v-if="v.children&&v.children.length"
          padding="0"
          trigger="hover"
          transfer
          placement="right-start"
        >
          <div
            class="small-side-item"
            style="width:50px;height:50px"
            flex="main:center cross:center"
          >
            <Icon :size="20" :custom="v.icon" />
          </div>
          <div slot="content">
            <menuItemSmall v-if="v.children&&v.children.length" :key="i+352" :list="v.children" />
          </div>
        </Poptip>

        <div
          @click="toLink(v.name)"
          v-else
          :key="i+352"
          class="small-side-item"
          flex="main:center cross:center"
        >
          <Tooltip transfer :content="v.title" placement="right">
            <Icon :size="20" :custom="v.icon" />
          </Tooltip>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Util from "../libs/utils.js";
import { side } from "@/mixins/mixins";
import menuItem from "./menu-item.vue";
import menuItemSmall from "./menu-item-small.vue";
export default {
  mixins: [side],
  components: { menuItem, menuItemSmall },
  data() {
    return {
      menuList: [],
    };
  },
  computed: {
    // menuList(){
    //     return this.$store.state.menuList
    //   }
  },
  mounted() {
    var _this = this;
    _this.menuList = JSON.parse(JSON.stringify(this.$store.state.menuList));
    Util.getMenu(this.menuList);

    if (this.side) {
      _this.$nextTick(function () {
        _this.$refs.menu.updateOpened();
      });
    }
  },
  methods: {},
};
</script>
<style scoped>
.small-side {
  background-color: #dadde8;
}
.small-side-item {
  border-bottom: #d1d5e1 1px solid;
  height: 50px;
  cursor: pointer;
  color: #6a6da9;
}
/* .side-small-list {
  padding: 0 10px;
}
.side-small-list li {
  border-bottom: #eee 0.5px solid;
  padding: 7px 0;
  cursor: pointer;
}
.side-small-list li:nth-last-child(1) {
  border-bottom: none;
} */
</style>