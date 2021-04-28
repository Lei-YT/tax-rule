<template>
  <div v-cloak>
    <div class="top-tools" ref='topTools' flex="cross:center">
      <span v-if="allData.length" flex="cross:center">
      选择页：
      <Select :z-index="1" transfer @on-change="changeYe" size="small" v-model="currentYe" style="width:130px;margin-right:10px">
          <Option v-for="(item,index) in allData" :value="item.id" :label="item.name" :key="item.name">
            <div style="width:200px" flex>
             <span flex-box="1">{{ item.name }}</span>
            <span flex-box="0" style="color:#ff9900;font-size:12px">
              <span  @click.stop="openEditYe(index)">编辑</span>
              <span  @click.stop="delYe(index)" style="margin-left:10px">删除</span>
            </span>
            </div>
            </Option>
      </Select>
      </span>
      <Button
        icon="md-code"
        size="small"
        type="success"
        @click="textarea?textarea=false:textarea=true"
        style="margin-right:10px"
      >code</Button>
      <!-- <Button size="small" type="success" @click="items=[]" style="margin-right:10px">clear</Button> -->
      <Button icon="md-book" size="small" type="success" @click="addYeModel = true" style="margin-right:10px">添加页</Button>
      <Button icon="md-bulb" size="small" type="success" @click="addItem" style="margin-right:10px">添加规则</Button>
      <Button icon="ios-jet" size="small" type="info"  @click="_N('啥都没干')" style="margin-right:10px">测试</Button>
      <Button icon="md-checkmark" size="small" type="primary" @click="_N('啥都没干')">保存</Button>
    </div>

    <textarea class="textarea-code" cols="30" rows="10" v-html="allData" v-show="textarea"></textarea>

    <!-- {{allData}} -->

    <div
      style="position: fixed;top:100px;right:20px;bottom:0px;overflow:hidden;padding:0 0px 0 5px;background-color:#fff;z-index:10"
    >
      <Anchor
        :affix="false"
        :offset-bottom="0"
        :offset-top="100"
        show-ink
        container=".wrap-div"
        style="width:120px"
      >
        <AnchorLink
          v-for="(vo,index) in items"
          :key="index"
          :href="`#${vo.sign}`"
          :title="vo.sign"
        />
      </Anchor>
    </div>

    <div :style="`height:${divHeight}px`" class="wrap-div">
      <div style="padding:20px">
        <div flex style="margin:0 120px 10px 0">
          <div flex-box="1" flex="cross:center">
            <b>全局标识：</b>
            <Input size="small" type="text" placeholder="输入标识..." style="width:200px" />
          </div>
          <div flex-box="0">
            <a href="javascript:;" style="margin-right:20px;color:#666" @click="collapse(true)">全部展开</a>
            <a href="javascript:;" style="color:#666" @click="collapse(false)">全部收缩</a>
          </div>
        </div>

        <div
          v-if="items.length"
          style="background-color:#eee;margin-right:120px;padding:7px;border-radius: 5px;"
        >
          <vuedraggable
            v-model="items"
            :options="{animation:350,scrollSensitivity:200,handle:'.drag-handle'}"
          >
            <transition-group>
              <div class="item" v-for="(vo,index) in items" :key="vo.sign" :id="`${vo.sign}`">
                <Card shadow :padding="0" style="width:100%" dis-hover>

                <div class="drag-handle-bar">
                  <Icon
                      class="drag-handle"
                      size="30"
                      color="#ddd"
                      type="ios-reorder"
                    />
                </div>


                  <div slot="title" flex="cross:center" >
                    <Icon
                      class="cursor"
                      size="16"
                      color="#333"
                      :custom="vo.custom.collapse?'iconfont icon-fold':'iconfont icon-unfold'"
                      style="margin:0 5px"
                      @click="openCollapse(index)"
                    />
                    <b>{{vo.title}}（{{vo.sign}}）</b>
                           
                  </div>
               
                  <Tooltip slot="extra" transfer content="添加标记条件" placement="top">
                    <Icon
                      class="cursor"
                      size="22"
                      color="#808695"
                      custom="iconfont icon-jiqixuexi-"
                      style="margin:0 8px"
                      @click="addSign(index)"
                    />
                  </Tooltip>
                  <Tooltip slot="extra" transfer content="添加结果" placement="top">
                    <Icon
                      class="cursor"
                      size="19"
                      color="#78a355"
                      custom="iconfont icon-safe"
                      style="margin:0 8px"
                      @click="addResult(index)"
                    />
                  </Tooltip>
                  <Tooltip slot="extra" transfer content="添加终止条件" placement="top">
                    <Icon
                      class="cursor"
                      size="20"
                      color="#7f9df3"
                      custom="iconfont icon-radiobox"
                      style="margin:0 8px"
                      @click="addStop(index)"
                    />
                  </Tooltip>

                  <Tooltip slot="extra" transfer content="删除规则" placement="top">
                    <Icon
                      class="cursor"
                      size="17"
                      color="#e0861a"
                      custom="iconfont icon-delete"
                      style="margin:0 8px"
                      @click="delItem(index)"
                    />
                  </Tooltip>

                  <div v-if="vo.custom.collapse" class="content">
                    <div class="item-item" flex="cross:center">
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">标题：</div>
                      <div flex="cross:center">
                        <Input
                          v-model="vo.title"
                          size="small"
                          type="text"
                          placeholder="输入标题..."
                          style="width:200px;margin-right:50px"
                        />

                        <Checkbox v-model="vo.isLoop">循环时存在为ture</Checkbox>
                      </div>
                    </div>

                    <div class="item-item" flex v-if="vo.signFactor.length">
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">标记条件：</div>
                      <div>
                        <signFactor :items="vo.signFactor" :sign="vo.sign" :ruleList="items" />
                      </div>
                    </div>

                    <div class="item-item" flex>
                      <div style="width:75px;border-right:#eee 0.5px solid;margin-right:10px">联合条件：</div>
                      <div>
                        <Unites :items="vo.unites" />
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

                  <div v-if="!vo.custom.collapse" style="padding:7px"></div>
                </Card>
              </div>
            </transition-group>
          </vuedraggable>
        </div>

        <div style="height:300px"></div>
      </div>
    </div>

    <addYe v-if="addYeModel" :open="addYeModel" />

    <editYe v-if="eidtYeModel" :open="eidtYeModel" :vo="editData" />

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

export default {
  mixins: [GetHeight],
  components: { Unites, signFactor, stopFactor, Result, vuedraggable,addYe,editYe },
  data() {
    return {
      addYeModel:false,
      eidtYeModel:false,
      editData:{},
      textarea: false,
      currentYe:'',
      items: [],
      allData:[],
      funcData:[],
      varData:[]
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.allData = _this.$store.state.ruleData;
    _this.init()
    _this.getVarData()
  },
  methods: {
    getFuncData(varData) {
      var _this = this;
      _this.$http
        .get(`/func/tree`)
        .then(function(res) {
            _.last(res.data.data).children = varData
            _this.$store.commit("funcData", res.data.data);
        })
    },
    getVarData() {
      var _this = this;
      _this.$http
        .get(`/func/variable`)
        .then(function(res) {
          _this.$store.commit("varData", res.data.data);
          _this.getFuncData(res.data.data)
          // console.log(res.data.data)
        })
    },
    init(){
      var _this = this;
        if(_this.allData.length){
            _this.currentYe = _this.allData[0].id
            _this.items = _this.allData[0].items
          }else{
             _this.currentYe = ''
            _this.items = ''
          }
    },
    changeYe(id) {
      var _this = this;
      _.each(_this.allData,function(v){
          if(id == v.id){
              _this.currentYe = v.id
             _this.items = v.items
          }
      })
    },
    delYe(index){
      var _this = this;
      _this.$refs.topTools.click()
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除本页吗？</p>",
        onOk: () => {
          _this.allData.splice(index, 1)
          _this._M('删除成功')
          if(_this.allData.length){
            _this.currentYe = _this.allData[0].id
            _this.items = _this.allData[0].items
          }else{
             _this.currentYe = ''
            _this.items = ''
          }
        }
      });
    },
    openEditYe(index){
      var _this = this;
      _this.$refs.topTools.click()
      _this.eidtYeModel = true;
      _this.editData = _this.allData[index]
    },
    addItem() {
      //添加规则
      var _this = this,
        length = _this.allData.length;

        if(!length){
          _this._N('请先添加规则页')
          return false
        }

        if(_this.currentYe==''){
          _this._N('请先选择页')
          return false
        }

        _.each(_this.allData,function(v){
          if(v.id == _this.currentYe){

            v.items.push({
              type: 0, //0不选 1循环时存在为ture 2循环时全满足为true 
              title: `规则-${_this.items.length + 1}`, //规则标题
              sign: `${Util.randomLetter(2)}${_.random(10000000, 99999999)}`, //标识
              remarks: "", //备注
              unites: [
                //联合条件
                {
                  actionType: "联合条件",
                  type: "或者",
                  conditions: []
                }
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
                collapse: "true" //是否折叠
              }
            });

            _this.items = v.items

          }
        })

      
    },
    delItem(index) {
      //删除规则
      this.$Modal.confirm({
        title: "温馨提示",
        content: "<p>你确定要删除本条规则吗？</p>",
        onOk: () => {
          this.items.splice(index, 1);
        }
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
          desc: ""
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
        value: "true"
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
          value: "false"
        });
      }
    },
    openCollapse(index) {
      var isSHow = this.items[index].custom.collapse;
      if (isSHow) {
        this.items[index].custom.collapse = false;
      } else {
        this.items[index].custom.collapse = true;
      }
    },
    collapse(data) {
      _.each(this.items, function(v) {
        v.custom.collapse = data;
      });
    }
  },
  updated() {
    this.$store.commit("ruleData", this.allData);
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.wrap-div {
  overflow-y: scroll;
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
.textarea-code {
  position: fixed;
  top: 90px;
  right: 30px;
  height: 600px;
  width: 500px;
  background-color: #002b36;
  color: #91bbbb;
  border: none;
  padding: 20px;
  z-index: 100;
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
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .7);
    background-color: #4fafc8;
    cursor: pointer;
  }
.drag-handle-bar{
  position: absolute;
  left:200px;
  top:-5px;
  right:200px;
  text-align: center;
}
.drag-handle{
  cursor:move
}
</style>