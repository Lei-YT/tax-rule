<template>
  <div v-cloak>
    <div flex="main:center cross:center" class="page">
      <div>
        <p class="title">404</p>
        <h3>很抱歉，页面找不到了！</h3>
        <p style="margin-top:10px">您可以返回上一步或者返回网站首页</p>
        <p style="margin-top:30px">
          <Button icon="ios-arrow-back" style="margin-right:10px" @click="$router.go(-1)">返回上一步</Button>
          <Button icon="md-home" type="primary" @click="$router.push('/')">首页</Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
.page {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  background-color: #cfd6e3;
  padding-bottom: 100px;
}
.title {
  font-size: 210px;
  font-weight: 900;
  text-shadow: 4px 4px 0 #cfd6e3, 6px 6px 0 #404f5e;
  line-height: 250px;
}
</style>
