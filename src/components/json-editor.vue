<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>
 
<script>
require("script-loader!jsonlint");
import CodeMirror from "codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/duotone-light.css";
import "@/theme/codebox-light.css";
import "@/theme/codebox-grey.css";
import "@/theme/codebox-dark.css";

import "codemirror/mode/javascript/javascript";
import "codemirror/mode/vue/vue";

// 支持代码折叠
import "codemirror/addon/fold/foldgutter.css"
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/indent-fold'

// scrollbarStyle: 设置滚动条,默认为"null"为不显示的滚动条，可以使用提供的其他滚动条：“simple”,"overlay"选择内侧与外侧的滚动条
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";

// 括号匹配
import "codemirror/addon/edit/matchbrackets";

// closetag
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";


//选中行高亮
import "codemirror/addon/selection/active-line";

//下面这几个引入的主要是验证提示类的,配置里的lint需要设置true,gutters: ['CodeMirror-lint-markers']
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/display/autorefresh"; //及时自动更新，配置里面也需要设置autoRefresh为true

import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";
// scrollbarStyle: 设置滚动条,默认为"null"为不显示的滚动条，可以使用提供的其他滚动条：“simple”,"overlay"选择内侧与外侧的滚动条

export default {
  name: "JsonEditor",
  /* eslint-disable vue/require-prop-types */
  props: {
    lint: {
      type: Boolean,
      default: false
    },
    styleActiveLine: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    matchBrackets: {
      type: Boolean,
      default: false
    },
    foldGutter: {
      type: Boolean,
      default: false
    },
    theme: {
      default: "default"
    },
    scrollbarStyle: {
      default: "null"
    },
    lineNumbers:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      jsonEditor: null
    };
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue();
      if (value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2));
      }
    }
  },
  mounted() {
    this.initJsonEditor();
    this.jsonEditor.setOption("readOnly", this.readOnly);
  },
  methods: {
    // 初始化jsonEditor
    initJsonEditor() {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: this.lineNumbers,
        mode: "application/json",
        gutters: ["CodeMirror-lint-markers","CodeMirror-foldgutter"],
        theme: this.theme,
        lint: this.lint,
        indentUnit: 2,
        autoCloseBrackets: true,
        autoCloseTag: true,

        foldGutter: this.foldGutter, // 代码折叠

        indentWithTabs: true, //首行缩进
        matchBrackets: this.matchBrackets, // 括号匹配
        smartIndent: true, // 智能缩进

        autorefresh: true,
        styleActiveLine: this.styleActiveLine, //选中行高亮
        scrollbarStyle: this.scrollbarStyle // //“simple”,"overlay"
      });
    },
    setValue(value) {
      this.jsonEditor.setValue(JSON.stringify(value, null, 2));
    },
    // 获取json
    getValue() {
      try {
        return JSON.stringify(JSON.parse(this.jsonEditor.getValue()));
      } catch (e) {
        this._N(e.message, "JSON格式错误");
        return null;
      }
    },
    refresh() {
        this.jsonEditor && this.jsonEditor.refresh();
    }
  }
};
</script>
 
<style>
.json-editor {
  height: 100%;
  overflow-y: auto;
  position: relative;
  font-size: 14px;
  width: 100%;
}
.CodeMirror {
  height: 100%;
  min-height: 300px;
}
.CodeMirror-line {
  line-height: 1.5;
}
.CodeMirror-scroll {
  min-height: 300px;
}
.CodeMirror-linenumber {
  color: #2b91af;
  height: 21px;
  line-height: 21px;
}
.CodeMirror-gutters {
  background-color: #fff;
  border-right: 0;
}
span.cm-string {
  color: #f08047;
}
</style>
