<template>
  <div v-cloak>
    <div flex>
      <typeChange @on-change="add">
        <span class="cursor blue" slot="button" style="margin-right:5px">{{data.name||'添加类型'}}</span>
      </typeChange>

      <div v-show="collapse" class="b-tree" v-if="data.conditions.length">
        <vuedraggable v-model="data.conditions" :animation="350" handle=".drag-handle">
          <transition-group>
            <div class="b-tree-item" v-for="(vo,index) in data.conditions" :key="index+'x'" flex>
              <Icon
                type="ios-menu"
                size="14"
                style="cursor:move;margin:3px 5px 0  0"
                class="drag-handle"
              />
              <Icon
                @click="del(index)"
                color="#999"
                size="14"
                class="cursor"
                type="ios-remove-circle-outline"
                style="margin:4px 5px 0 0"
              />

              <template v-if="vo.tableName&&vo.tableName!=''">
                <span style="color:#999">[{{vo.tableName}}]</span>
                <!-- {{vo.name}} -->
                <variablePoptip :variable="vo" />
              </template>

              <component v-else :data="vo" :is="$store.state.funcFlatData[vo.name]" />
            </div>
          </transition-group>
        </vuedraggable>
      </div>
    </div>
  </div>
</template>

<script>
import "@/components/rule/index.js";
import vuedraggable from "vuedraggable";
import typeChange from "@/components/type-change.vue";
import variablePoptip from "@/components/variable-poptip.vue";

export default {
  components: {
    vuedraggable,
    typeChange,
    variablePoptip
  },
  props: ["data"],
  data() {
    return {
      collapse: true,
    };
  },
  filters: {},
  computed: {},
  mounted() {
    var _this = this;
  },
  methods: {
    add(data) {
      var _this = this,
        items = _this.data.conditions,
        name = data.name;

      if (name === "括号") {
        items.push({
          name: data.name,
          conditions: [],
        });
      } else if (
        name === "List集合" ||
        name === "重复" ||
        name === "求平均值" ||
        name === "是否有中文字符" ||
        name === "求绝对值" ||
        name === "求和" ||
        name === "是否存在" ||
        name === "求最大值" ||
        name === "求最小值" ||
        name === "计算字符长度" ||
        name === "字符去空格" ||
        name === "大写转小写" ||
        name === "小写转大写" ||
        name === "英文符号转中文符号" ||
        name === "中文符号转英文符号" ||
        name === "为空且" ||
        name === "为空或" ||
        name === "不为空且" ||
        name === "不为空或" ||
        name === "累加求和" ||
        name === "最大日期" ||
        name === "最小日期" ||
        name === "Map集合" ||
        name === "招待费是否为多个收款人" ||
        name === "招待费是否符合条件附件" ||
        name === "原支付信息与关联单校验" ||
        name === "情况说明正确信息校验" ||
        name === "原支付信息校验" ||
        name === "招待费人均费用校验" ||
        name === "发票代码和号码去重求和"
      ) {
        items.push({
          name: data.name,
          conditions: [],
        });
      } else if (
        name == "一一匹配按特定字段且按此字段行" ||
        name == "集合内相等" ||
        name == "集合内不相等" ||
        name == "集合内大于" ||
        name == "集合内大于等于" ||
        name == "集合内小于" ||
        name == "集合内小于等于" ||
        name == "集合内包含" ||
        name == "集合内不包含" ||
        name == "集合内一一顺序匹配" ||
        name == "集合内时间是否为当年" ||
        name == "集合内不为空"
      ) {
        items.push({
          name: data.name,
          conditions: [{}, {}],
        });
      } else if (name === "List集合共有条件" || name === "Map集合共有条件") {
        items.push({
          name: data.name,
          conditions: [],
          rule: {},
        });
      } else if (name === "为空" || name === "不为空") {
        items.push({
          name: data.name,
          type: "1", //1为变量 2为手动输入
          variable: {}, //变量
          value: "", //手工输入值
        });
      } else if (
        name === "包含" ||
        name === "不包含" ||
        name === "模糊匹配" ||
        name === "附件数"
      ) {
        items.push({
          name: data.name,
          targetVariable: {}, //目标变量
          type: "1", //1为变量 2为手动输入
          variable: {}, //变量
          value: "", //手工输入值
        });
      } else if (
        name == "包含且" ||
        name == "包含或" ||
        name == "不包含且" ||
        name == "不包含或" ||
        name == "满足或"
      ) {
        items.push({
          name: data.name,
          targetVariable: {}, //目标变量
          conditions: [],
        });
      } else if (
        name == "截取X之后的值" ||
        name == "截取X之前的值" ||
        name == "截第X位之后的值" ||
        name == "截第X位之前的值"
      ) {
        items.push({
          name: data.name,
          conditions: [], //变量
          value: null, //手工输入值
        });
      } else if (name == "截取第X位到第Y位中间的值") {
        items.push({
          name: data.name,
          conditions: [], //变量
          start: null, //手工输入值
          end: null, //手工输入值
        });
      } else if (name == "截取第X个X值之前值" || name == "截取第X个X值之后值") {
        items.push({
          name: data.name,
          conditions: [], //变量
          number: null, //手工输入数字
          str: "", //手工输入字符串
        });
      } else if (
        name == "赋值" ||
        name === "包含" ||
        name === "不包含" ||
        name === "模糊匹配"
      ) {
        items.push({
          name: data.name,
          conditions: [], //目标变量
          type: "1", //1为变量 2为手动输入
          variable: {}, //变量赋值
          value: "", //手工输入字符串
        });
      } else if (
        name == "日期加天" ||
        name == "日期加月" ||
        name == "日期加年"
      ) {
        items.push({
          name: data.name,
          date: {
            //目标日期
            type: "1", //1为变量 2为手动输入
            variable: {}, //变量
            value: "", //手工输入值
          },
          number: {
            //增加的天数 月数 年数
            type: "1", //1为变量 2为手动输入
            variable: {}, //变量
            value: null, //手工输入值
          },
        });
      } else if (name === "取年份" || name === "取月份") {
        items.push({
          name: data.name,
          dateType: "1", //1为变量 2为手动输入
          variable: {}, //变量
          value: "", //手工输入值
        });
      } else if (name === "日期") {
        items.push({
          name: data.name,
          value: "", //手工输入值
        });
      } else if (name === "值") {
        items.push({
          name: data.name,
          type: "字符串",
          value: "", //字符串
          number: null, //数字
        });
      } else if (name == "日期相减返回天" || name == "日期相减返回月" || name == "最大最小日期相减返回天") {
        items.push({
          name: data.name,
          date1: {
            //目标日期
            type: "1", //1为变量 2为手动输入 3当前日期
            variable: {}, //变量
            value: "", //手工输入值
          },
          date2: {
            //减去的日期
            type: "1", //1为变量 2为手动输入 3当前日期
            variable: {}, //变量
            value: "", //手工输入值
          },
        });
      } else if (name == "日期区间") {
        items.push({
          name: data.name,
          date1: {
            //起始日期
            type: "1", //1为变量 2为手动输入 3当前日期
            variable: {}, //变量
            value: "", //手工输入值
          },
          date2: {
            //终止日期
            type: "1", //1为变量 2为手动输入 3当前日期
            variable: {}, //变量
            value: "", //手工输入值
          },
          date3: {
            //截止日期
            type: "1", //1为变量 2为手动输入 3当前日期
            variable: {}, //变量
            value: "", //手工输入值
          },
        });
      } else {
        items.push(data);
      }
      this._M("添加成功");
    },
    del(i) {
      this.data.conditions.splice(i, 1);
    },
    kg() {
      if (this.collapse) {
        this.collapse = false;
      } else {
        this.collapse = true;
      }
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.kg {
  position: absolute;
  left: 5px;
  top: 0px;
  z-index: 100;
}
</style>
