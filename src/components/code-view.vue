<template>
  <div v-cloak class="wrap">
    <Modal
      :scrollable="true"
      draggable
      :value="open"
      footer-hide
      transfer
      width="500"
      :mask-closable="false"
      class-name="diy-modal-body"
      @on-cancel="cancel"
    >
      <div slot="header">
        <b>code viewer</b>
      </div>
      <textarea class="textarea-code" cols="30" rows="10" v-html="json"></textarea>
      <!-- <jsonEditor
        :lineNumbers="false"
        :matchBrackets="false"
        :foldGutter="false"
        :lint="false"
        :styleActiveLine="true"
        theme="material-palenight"
        scrollbarStyle="overlay"
        ref="editor"
        style="width:100%;height:100%"
      />-->
    </Modal>
  </div>
</template>

<script>
import jsonEditor from "@/components/json-editor.vue";
export default {
  components: { jsonEditor },
  props: ["open", "json"],
  methods: {
    cancel() {
      this.$parent.textareaModal = false;
      this.$emit("change", false);
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.item {
  /* border-bottom: #eee 1px solid; */
  padding: 10px 0;
  border-bottom: #eee 1px solid;
}
.item span {
  color: red;
}
.form-item .form-item-title {
  margin-bottom: 5px;
  overflow: hidden;
}
</style>
<style>
.diy-modal-body .ivu-modal-body {
  height: 600px;
  padding: 0;
}
.diy-modal-body div.ivu-modal-header {
  background-color: #242737;
  border-bottom: none;
}
.textarea-code {
  width: 100%;
  height: 100%;
  background-color: #002b36;
  color: #91bbbb;
  border: none;
  padding: 20px;
  z-index: 10000;
  resize: none;
  outline: none;
}
/* 滚动条框设置 */
.textarea-code::-webkit-scrollbar {
  width: 15px;
  background-color: #03404f;
}

/* 滚动条的设置 */
.textarea-code::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.7);
  background-color: #4fafc8;
  cursor: pointer;
}
</style>

