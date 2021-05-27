<template>
  <div v-cloak>
    <Poptip padding="0" trigger="hover" placement="bottom-start">
    <span class="cursor green"> {{variable.name||'______'}} </span>
    <div slot="content" style="padding: 1rem;min-width: 300px;">
      <template v-if="variable.name">
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="8">类型</Col>
        <Col span="16">{{variable.type}}</Col>
      </Row>
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="8">是否特殊</Col>
        <Col span="16">{{variable.isSpecial}}</Col>
      </Row>
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="8">jsonpath</Col>
        <Col span="16">{{variable.jsonpath}}</Col>
      </Row>
      <Row type="flex" justify="start" class="code-row-bg">
        <Col span="8">默认值</Col>
        <Col span="16">{{String(variable.defaultValue)}}</Col>
      </Row>
      </template>
      <div v-else style="padding:0px;color:#999">变量数据</div>
    </div>
    </Poptip>
  </div>
</template>
<script>
export default {
  props: ["variable"],
  data() {
    return {};
  },
}
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.code-row-bg{
  border-bottom: #eee 0.5px solid;
  padding: 5px 0;
}
</style>
