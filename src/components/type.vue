<template>
  <div v-cloak>
    <div flex>
      <typeChange @on-change="add">
        <span class="cursor blue" slot="button" style="margin-right: 5px">{{
          data.name || "添加类型"
        }}</span>
      </typeChange>

      <div v-show="collapse" class="b-tree" v-if="data.conditions.length">
        <vuedraggable
          v-model="data.conditions"
          :animation="350"
          handle=".drag-handle"
        >
          <transition-group>
            <div
              class="b-tree-item"
              v-for="(vo, index) in data.conditions"
              :key="index + 'x'"
              flex
            >
              <Icon
                type="ios-menu"
                size="14"
                style="cursor: move; margin: 3px 5px 0 0"
                class="drag-handle"
              />
              <Icon
                @click="del(index)"
                color="#999"
                size="14"
                class="cursor"
                type="ios-remove-circle-outline"
                style="margin: 4px 5px 0 0"
              />

              <template v-if="vo.tableName && vo.tableName != ''">
                <span style="color: #999">[{{ vo.tableName }}]</span>
                <!-- {{vo.name}} -->
                <variablePoptip :variable="vo" />
              </template>

              <component
                v-else
                :data="vo"
                :is="$store.state.funcFlatData[vo.name]"
              />
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
    variablePoptip,
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
      const components = data.components;
      switch (components) {
        case "typeSymbolComp":
        case "typeKuohaoComp":
          items.push({
            name: data.name,
            conditions: [],
          });
          break;
        case "typeListComp":
        case "typeMapComp":
        case "typeVarMostComp":
        case "typeVarOneComp":
        case "typeVarStrMostComp":
        case "typeDefaultComp":
          items.push({
            name: data.name,
            conditions: [],
          });
          break;
        case "typeVarTwoComp":
          items.push({
            name: data.name,
            conditions: [{}, {}],
          });
          break;
        case "typeLoopVarComp":
          items.push({
            name: data.name,
            conditions: [{}, {}, {}],
          });
          break;
        case 'typeListShareComp':
        case 'typeMapShareComp':
        items.push({
          name: data.name,
          conditions: [],
          rule: {},
        });
          break;
        case "typeVarStrComp":
          items.push({
            name: data.name,
            type: "1", //1为变量 2为手动输入
            variable: {}, //变量
            value: "", //手工输入值
          });
          break;
        case "typeVarVarStrComp":
        case "typeVarVarStrStrComp":
          items.push({
            name: data.name,
            targetVariable: {}, //目标变量
            type: "1", //1为变量 2为手动输入
            variable: {}, //变量
            value: "", //手工输入值
          });
          break;
        case "typeVarVarStrMostComp":
          items.push({
            name: data.name,
            targetVariable: {}, //目标变量
            conditions: [],
          });
          break;
        case "typeSubstrComp":
          items.push({
            name: data.name,
            conditions: [], //变量
            value: null, //手工输入值
          });
          break;
        case "typeSubstrStartEndComp":
          items.push({
            name: data.name,
            conditions: [], //变量
            start: null, //手工输入值
            end: null, //手工输入值
          });
          break;
        case "typeSubstrNumStrComp":
          items.push({
            name: data.name,
            conditions: [], //变量
            number: null, //手工输入数字
            str: "", //手工输入字符串
          });
          break;
        case "typeDateAddComp":
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
          break;
        case "typeQunianfenComp":
          items.push({
            name: data.name,
            dateType: "1", //1为变量 2为手动输入
            variable: {}, //变量
            value: "", //手工输入值
          });
          break;
        case "typeDateComp":
          items.push({
            name: data.name,
            value: "", //手工输入值
          });
          break;
        case "typeValueComp":
          items.push({
            name: data.name,
            type: "字符串",
            value: "", //字符串
            number: null, //数字
          });
          break;
        case "typeDateSubtractComp":
        case "typeDateMaxSubtractComp":
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
          break;
        case "typeDatePeriodComp":
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
          break;
        default:
          items.push(data);
          break;
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
