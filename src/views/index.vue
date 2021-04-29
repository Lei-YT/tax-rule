<template>
  <div>
    <nav-bar />
    <div class="side-bar" :style="side?'width:240px':'width:50px;background-color: #dadde8;'">
      <side-bar />
    </div>
    <div class="wrap-box" :style="side?'left:240px':'left:50px'">
      <div class="breadcrumb" flex="cross:center">
        <Breadcrumb>
          <BreadcrumbItem v-for="(v,i) in breadcrumb" :key="i" :to="`${v.routeName}?${pathquery}`">{{v.title}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import navBar from "@/components/nav-bar.vue";
import sideBar from "@/components/side-bar.vue";
import Util from "@/libs/utils";
import { side } from "@/mixins/mixins";
export default {
  mixins: [side],
  components: { navBar, sideBar },
  data() {
    return {};
  },
  computed: {
      pathquery: function() {
        return this.$route.fullPath.substring(this.$route.fullPath.indexOf('?') + 1, this.$route.fullPath.length)
      }
  },
  mounted() {
    // console.log(this.breadcrumb)
    // var _this = this;
    // _this.getHeight()
    // //窗口改变时执行
    // window.addEventListener('resize', _.debounce(function(){
    //   _this.getHeight()
    // }, 150), false)
  },
  methods: {},
  watch: {
    "$route.fullPath"(newVal, oldVal) {
      // console.log(newVal,oldVal)
    },
  },
};
</script>

<style scoped>
.side-bar {
  position: fixed;
  left: 0;
  top: 45px;
  bottom: 0;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: #eee 1px solid;
}
.wrap-box {
  position: fixed;
  top: 45px;
  bottom: 0;
  right: 0;
  background-color: #fff;
  overflow-y: auto;
}
.breadcrumb {
  border-bottom: #eee 1px solid;
  height: 40px;
  padding: 0 20px;
  /* background-color: #f6f6f6; */
}
</style>
