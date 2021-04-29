<template>
  <div v-cloak>
    <div class="top-tools" ref="topTools" flex="cross:center">
      <Button
        @click="$router.push({name:'project-version-scene',query:{versionId:$route.query.versionId,projectId:$route.query.projectId}})"
        size="small"
        type="default"
        icon="ios-arrow-back"
        style="margin-right:10px"
      >返回</Button>
      <Button
        icon="ios-paper-plane"
        size="small"
        type="info"
        @click="allTest"
        style="margin-right:10px"
      >测试</Button>
      <Button
        icon="ios-folder-open"
        size="small"
        type="warning"
        @click="openAddModel=true"
        style="margin-right:10px"
      >保存为新版本</Button>
      <Button icon="md-done-all" size="small" type="primary" @click="save">保存</Button>
    </div>

    <div
      flex
      style="position: absolute;left:20px;top:40px;right:37px;background-color:#fff;height:60px;z-index:1000"
    >
      <div flex-box="1" flex="cross:center">
        <Button
          icon="md-bulb"
          size="small"
          type="success"
          @click="addItem"
          style="margin-right:10px"
        >添加规则</Button>
        <Button
          icon="md-book"
          size="small"
          type="success"
          @click="addYeModel = true"
          style="margin-right:10px"
        >添加分类</Button>
        <span v-if="allData.length" flex="cross:center">
          选择页：
          <Select
            :z-index="1"
            transfer
            @on-change="changeYe"
            size="small"
            v-model="currentYe"
            style="width:350px;margin-right:10px"
          >
            <Option
              v-for="(item,index) in allData"
              :value="item.id"
              :label="item.name"
              :key="item.name"
            >
              <div style="width:300px" flex>
                <span flex-box="1">{{ item.name }}</span>
                <span flex-box="0" style="color:#ff9900;font-size:12px">
                  <span @click.stop="openEditYe(index)">编辑</span>
                  <span @click.stop="delYe(index)" style="margin-left:10px">删除</span>
                </span>
              </div>
            </Option>
          </Select>
        </span>
      </div>
      <div flex-box="0" flex="cross:center">
        <Button icon="md-code" size="small" type="success" @click="textareaModal=true">code</Button>
      </div>
    </div>

    <div :style="`height:${divHeight}px`" class="wrap-div">
      <div style="padding:20px">
        <div style="height:40px"></div>

        <div v-show="tableLoading">数据加载中...</div>

        <div v-show="!items.length&&!tableLoading">暂时没有数据</div>

        <div
          v-show="items.length"
          style="background-color:#eee;margin-right:0px;padding:7px;border-radius: 5px;"
        >
          <vuedraggable
            :list="items"
            :animation="350"
            :scrollSensitivity="false"
            handle=".drag-handle"
          >
            <transition-group>
              <div class="item" v-for="(vo,index) in items" :key="vo.sign" :id="`${vo.sign}`">
                <Card shadow :padding="0" style="width:100%" dis-hover>
                  <div slot="title" flex="cross:center">
                    <span class="drag-handle">
                      <Icon
                        class="move"
                        size="16"
                        color="#333"
                        type="ios-menu"
                        style="margin:0 5px"
                      />
                    </span>
                    <Icon
                      class="cursor"
                      size="16"
                      color="#333"
                      :custom="vo.custom.collapse?'iconfont icon-fold':'iconfont icon-unfold'"
                      style="margin:0 5px"
                      @click="openCollapse(index)"
                    />
                    <b class="cursor" @click="openCollapse(index)">
                      {{vo.title}}（{{vo.sign}}）
                      <span
                        v-if="vo.isList"
                        style="color:red;font-weight:300"
                      >List专用</span>
                    </b>
                  </div>
                  <a slot="extra" href="javascript:;" title="测试">
                    <Icon
                      class="cursor"
                      size="20"
                      color="#2d8cf0"
                      type="ios-paper-plane-outline"
                      style="margin:0 8px"
                      @click="oneTest(index)"
                    />
                  </a>
                  <a slot="extra" href="javascript:;" title="添加标记条件">
                    <Icon
                      class="cursor"
                      size="22"
                      color="#808695"
                      custom="iconfont icon-jiqixuexi-"
                      style="margin:0 8px"
                      @click="addSign(index)"
                    />
                  </a>
                  <a slot="extra" href="javascript:;" title="添加结果">
                    <Icon
                      class="cursor"
                      size="19"
                      color="#78a355"
                      custom="iconfont icon-safe"
                      style="margin:0 8px"
                      @click="addResult(index)"
                    />
                  </a>
                  <a slot="extra" href="javascript:;" title="添加终止条件">
                    <Icon
                      class="cursor"
                      size="20"
                      color="#7f9df3"
                      custom="iconfont icon-radiobox"
                      style="margin:0 8px"
                      @click="addStop(index)"
                    />
                  </a>

                  <a slot="extra" href="javascript:;" title="删除规则">
                    <Icon
                      slot="extra"
                      class="cursor"
                      size="17"
                      color="#e0861a"
                      custom="iconfont icon-delete"
                      style="margin:0 8px"
                      @click="delItem(index)"
                    />
                  </a>

                  <div v-if="vo.custom.collapse" class="content">
                    <div class="item-item" flex="cross:center">
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">标题：</div>
                      <div flex="cross:center">
                        <Input
                          v-model="vo.title"
                          size="small"
                          type="text"
                          placeholder="输入标题..."
                          style="width:300px;margin-right:15px"
                        />循环：
                        <Select
                          size="small"
                          v-model="vo.type"
                          style="width:160px;margin-right:10px"
                        >
                          <Option :value="0">默认</Option>
                          <Option :value="1">循环时存在为ture</Option>
                          <Option :value="2">循环时全满足为true</Option>
                        </Select>

                        <!-- <Checkbox v-model="vo.isLoop">循环时存在为ture</Checkbox> -->

                          <!-- todo: v-model="vo.warningLevel" -->
                        <Select
                          size="small"
                          v-model="vo.warningLevel"
                          style="width:160px;margin-right:10px"
                          placeholder="选择预警等级"
                        >
                          <Option :value="1">一</Option>
                        </Select>
                        <Checkbox
                          @on-change="$store.commit('ruleData',allData)"
                          v-model="vo.isList"
                          style="margin-left:10px"
                        >list专用</Checkbox>

                        <!-- <RadioGroup v-model="vo.type" style="margin-left:10px">
                            <Radio :label="1">循环时存在为ture</Radio>
                            <Radio :label="2">循环时全满足为true</Radio>
                        </RadioGroup>-->
                      </div>
                    </div>

                    <div class="item-item" flex v-if="vo.signFactor.length">
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">标记条件：</div>
                      <div>
                        <signFactor :items="vo.signFactor" :sign="vo.sign" :ruleList="allData" />
                      </div>
                    </div>

                    <div class="item-item" flex>
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">联合条件：</div>
                      <div>
                        <lazy-render :immediately="true">
                          <Unites :items="vo.unites" />
                          <div slot="tip">
                            <Icon type="ios-loading" size="16" class="spin-icon-load" />Loading...
                          </div>
                        </lazy-render>
                      </div>
                    </div>

                    <div class="item-item" flex v-if="vo.result.length">
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">结果：</div>
                      <div>
                        <Result :items="vo.result" />
                      </div>
                    </div>

                    <div class="item-item" flex v-if="vo.stopFactor.length">
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">终止条件：</div>
                      <div>
                        <stopFactor :items="vo.stopFactor" />
                      </div>
                    </div>

                    <div class="item-item" flex="cross:center">
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">备注：</div>
                      <div>
                        <Input
                          v-model="vo.remarks"
                          size="small"
                          type="text"
                          placeholder="输入备注..."
                          style="width:400px"
                        />
                      </div>
                    </div>
                  </div>

                  <div v-show="!vo.custom.collapse" style="padding:7px"></div>
                </Card>
              </div>
            </transition-group>
          </vuedraggable>
        </div>

        <div style="height:30px"></div>
      </div>
    </div>

    <addYe v-if="addYeModel" :open="addYeModel" />
    <editYe v-if="eidtYeModel" :open="eidtYeModel" :vo="editData" />
    <addModel v-if="openAddModel" :open="openAddModel" :ruleFormat="allData" />
    <testModel
      v-if="openTestModel"
      :open="openTestModel"
      :projectId="$route.query.projectId"
      :ruleFormat="testJson"
    />
    <codeView v-if="textareaModal" :open="textareaModal" :json="allData" />

    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
import { GetHeight } from "@/mixins/mixins";
import Unites from "@/components/unites.vue";
import signFactor from "@/components/sign-factor.vue";
import stopFactor from "@/components/stop-factor.vue";
import Result from "@/components/rule-result.vue";
import addYe from "@/components/add-ye.vue";
import editYe from "@/components/eidt-ye.vue";
import Util from "@/libs/utils.js";
import vuedraggable from "vuedraggable";
import addModel from "@/views/project-version-scene-rule-saveas.vue";
import testModel from "@/views/test-rule.vue";
import codeView from "@/components/code-view.vue";
// import { delete } from 'vue/types/umd';

export default {
  mixins: [GetHeight],
  components: {
    Unites,
    signFactor,
    stopFactor,
    Result,
    vuedraggable,
    addYe,
    editYe,
    addModel,
    testModel,
    codeView,
  },
  data() {
    return {
      spinShow: false,
      openAddModel: false,
      addYeModel: false,
      eidtYeModel: false,
      openTestModel: false,
      editData: {},
      textareaModal: false,
      currentYe: "",
      items: [],
      allData: [],
      testJson: [],
      id: null,
      tableLoading: false,
    };
  },
  computed: {},

  mounted() {
    var _this = this;
    _this.getData();
    _this.getVarData();
  },
  methods: {
    getData() {
      var _this = this;
      _this.tableLoading = true;
      _this.$http
        .post(`/rule/getRule?sceneId=${_this.$route.query.id}`)
        .then(function (res) {
          if (res) {
            if (res.data.data) {
              _this.id = res.data.data.id;
              var tempData = JSON.parse(res.data.data.ruleFormat);
              // _this.allData = tempData;
              _this.allData = tempData.map(di => {
                const newItems = di.items.map(rule => ({warningLevel: 0, ...rule}));
                return ({ ...di, "items": newItems });
              });
              _this.$store.commit("ruleData", _this.allData);
              _this.init();
            }
            _this.tableLoading = false;
          }
        });
    },
    init() {
      var _this = this;
      if (_this.allData.length) {
        _this.currentYe = _this.allData[0].id;
        _this.items = _this.allData[0].items;
        _this.closeCollapse();
      } else {
        _this.currentYe = "";
        _this.items = [];
      }
    },
    getFuncData(varData) {
      var _this = this;
      _this.$http.get(`/func/tree`).then(function (res) {
        _.last(res.data.data).children = varData;
        _this.$store.commit("funcData", res.data.data);

        const flatten = function (arr) {
          let result = [];
          _.each(arr, function (item, i) {
            result.push(item);
            if (item.children && item.children.length) {
              result = result.concat(flatten(item.children));
              item.children = [];
            }
          });
          return result;
        };

        let funcFlatData = {};

        _.each(
          flatten(_.dropRight(JSON.parse(JSON.stringify(res.data.data)))),
          function (v) {
            funcFlatData[v.name] = v.components;
          }
        );

        _this.$store.commit("funcFlatData", funcFlatData);
      });
    },
    getVarData() {
      var _this = this;
      _this.$http
        .get(`/func/variable/${_this.$route.query.projectId}`)
        .then(function (res) {
          _this.$store.commit("varData", res.data.data);
          _this.getFuncData(res.data.data);
        });
    },
    changeYe(id) {
      var _this = this;
      _this.items = [];

      _.each(_this.allData, function (v) {
        if (id == v.id) {
          _this.currentYe = v.id;
          _this.items = v.items;
          _this.closeCollapse();
          // console.log(v.items)
        }
      });
    },
    delYe(index) {
      var _this = this;
      _this.$refs.topTools.click();
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除本页吗？</p>",
        onOk: () => {
          _this.allData.splice(index, 1);
          _this._M("删除成功");
          if (_this.allData.length) {
            _this.currentYe = _this.allData[0].id;
            _this.items = _this.allData[0].items;
          } else {
            _this.currentYe = "";
            _this.items = "";
          }
        },
      });
    },
    openEditYe(index) {
      var _this = this;
      _this.$refs.topTools.click();
      _this.eidtYeModel = true;
      _this.editData = _this.allData[index];
    },
    addItem() {
      //添加规则
      var _this = this,
        length = _this.allData.length;

      if (!length) {
        _this._N("请先添加规则页");
        return false;
      }

      if (_this.currentYe == "") {
        _this._N("请先选择页");
        return false;
      }

      _.each(_this.allData, function (v) {
        if (v.id == _this.currentYe) {
          v.items.push({
            isList: false, //list专用
            type: 0, //0不选 1循环时存在为ture 2循环时全满足为true
            title: `规则-${_this.items.length + 1}`, //规则标题
            sign: `${Util.randomLetter(2)}${_.random(1000000000, 9999999999)}`, //标识
            remarks: "", //备注
            unites: [
              //联合条件
              {
                actionType: "联合条件",
                type: "或者",
                conditions: [],
              },
            ],
            signFactor: [
              //标记条件
            ],
            stopFactor: [
              //终止条件
            ],
            result: [
              //结果
            ],
            custom: {
              //custom只是给前端做交互使用，后端可以不理会
              collapse: "true", //是否折叠
            },
          });

          _this.items = v.items;
        }
      });
    },
    delItem(index) {
      //删除规则
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除本条规则吗？</p>",
        onOk: () => {
          this.items.splice(index, 1);
        },
      });
    },

    addResult(index) {
      //添加结果
      var _this = this,
        data = this.items[index]["result"];
      if (data.length > 0) {
        this._N("结果，不能重复添加");
      } else {
        data.push({
          type: "通过",
          resultType: "变量报错",
          voluation: [],
          desc: "",
        });
      }
    },

    addSign(index) {
      //添加标识条件
      var _this = this,
        data = this.items[index]["signFactor"];
      data.push({
        type: "or",
        rule: "",
        value: "true",
      });
    },

    addStop(index) {
      //添加终止条件
      var _this = this,
        data = this.items[index]["stopFactor"];

      if (data.length > 0) {
        this._N("终止条件，不能重复添加");
      } else {
        data.push({
          value: "false",
        });
      }
    },
    openCollapse(index) {
      var _this = this;

      // console.log('gogogo')

      _.each(this.items, function (v, i) {
        if ((i == index && v.custom.collapse) || i != index) {
          v.custom.collapse = false;
        } else {
          v.custom.collapse = true;
        }
      });

      //  this.$nextTick(function(){
      //       // console.log('lalala')
      //       _this._M('lalala')
      //   });
    },
    closeCollapse() {
      _.each(this.items, function (v) {
        v.custom.collapse = false;
      });
    },
    allTest() {
      this.testJson = this.allData;
      this.openTestModel = true;
    },
    oneTest(index) {
      var items = _.remove(
        JSON.parse(JSON.stringify(this.items)),
        function (v, i) {
          return i == index;
        }
      );
      this.testJson = [
        {
          id: this.currentYe,
          items: items,
        },
      ];
      this.openTestModel = true;
    },
    save() {
      var _this = this;
      _this.submitLoading = true;
      _this.$http
        .post("/rule/addRule", {
          id: _this.id,
          sceneId: Number(_this.$route.query.id),
          ruleFormat: JSON.stringify(_this.allData),
        })
        .then((res) => {
          if (res) {
            if (!_this.id) {
              _this.getData();
            }
            _this.$Modal.success({
              title: "提示",
              content: "规则保存成功",
            });
          }
        });
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.wrap-div {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.item {
  /* border-bottom: #eee 1px solid; */
  padding: 7px;
}
.item-item {
  border-bottom: #eee 0.5px solid;
  padding: 15px 0;
}
.item-item:last-child {
  border-bottom: none;
}
.content {
  padding: 0 15px;
}
.spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
