<template>
  <div v-cloak style="background-color: #363b53;">
    <Modal fullscreen v-model="isShow" :closable="false"  footer-hide  :mask-closable="false" @on-cancel="cancel">
    <div class="top-bar" flex="cross:center">
      <div flex-box="1" flex="cross:center">
        <Icon size="22" type="ios-paper-plane" style="margin:0 5px 0 10px" />
        <h3 v-show="step=='init'">业务测试</h3>
        <h3 v-show="step=='result'">测试结果</h3>
        <span v-show="step=='init'" style="margin-left:5px;color:#545d81">Testing</span>
        <span v-show="step=='result'" style="margin-left:5px;color:#545d81">Result</span>
      </div>
      <div flex-box="0">
        <button
          v-if="step=='init'"
          class="test-btn"
          style="margin-right:10px"
          @click="test"
          :disabled="testLoading"
        >{{testLoading?'提交中...':'开始测试'}}</button>
        <button
          v-if="step=='result'"
          class="test-btn"
          style="margin-right:10px"
          @click="step='init'"
        >返回</button>
        <button
          class="test-btn"
          style="margin-right:10px"
          @click="cancel"
        >关闭</button>
      </div>
    </div>

    <div class="wrap" flex v-show="step=='init'">
      <div flex-box="1" style="width:60%">
        <jsonEditor
          :styleActiveLine="true"
          :lint="true"
          scrollbarStyle="overlay"
          theme="material-palenight"
          ref="editor"
          style="width:100%;height:100%"
        />
      </div>
      <div flex-box="0">
        <h3 style="margin:20px 0 0 30px;color: #565c78;">选择需测试版本及版本场景</h3>
        <div style="padding:10px 30px;color:#fff" flex>
          <div class="test-box">
            <div class="test-box-title" flex="cross:center">
              <b>选择版本</b>
            </div>
            <div class="test-box-list">
              <template v-if="projectData.length">
                <template v-for="(vo,index) in projectData">
                  <div
                    class="test-box-item"
                    :key="vo.id"
                    flex="cross:center"
                    :style="vo.selected?'background-color:#444b69':''"
                    @click="changeVersion(index)"
                  >
                    <span flex-box="1">{{vo.versionName}}</span>
                    <span flex-box="0">
                      <Icon v-if="vo.selected" type="md-checkmark-circle" size="18" />
                      <Icon v-else type="ios-checkmark-circle-outline" size="18" color="#4c5372" />
                    </span>
                  </div>
                </template>
              </template>
              <template v-else>
                <p style="color:#5c6387;padding:10px">暂时没有版本信息</p>
              </template>
            </div>
          </div>

          <div class="test-box" style="margin-left:20px">
            <div class="test-box-title" flex="cross:center">
              <span flex-box="1">
                <b>选择场景</b>
              </span>
              <span
                flex-box="0"
                style="margin-right:10px;cursor: pointer;"
                v-if="!all"
                @click="selectAll(true)"
              >全选</span>
              <span
                flex-box="0"
                style="margin-right:10px;cursor: pointer;"
                v-if="all"
                @click="selectAll(false)"
              >取消</span>
            </div>
            <div class="test-box-list">
              <template v-if="sceneList.length">
                <template v-for="(vo,index) in sceneList">
                  <div
                    class="test-box-item"
                    :key="vo.id"
                    flex="cross:center"
                    :style="vo.selected?'background-color:#444b69':''"
                    @click="changeScene(index)"
                  >
                    <span flex-box="1">{{vo.sceneName}}</span>
                    <span flex-box="0">
                      <Icon v-if="vo.selected" type="md-checkmark-circle" size="18" />
                      <Icon v-else type="ios-checkmark-circle-outline" size="18" color="#4c5372" />
                    </span>
                  </div>
                </template>
              </template>
              <template v-else>
                <p style="color:#5c6387;padding:10px">暂时没有场景信息</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap" flex v-show="step=='result'" style="color:#555">
      <!-- {{resultData}} -->
      <div style="padding:40px 60px;width:100%">


        <div style="padding:20px;background:#fff">
          <h3>单据编号：{{resultData.bills}}</h3>
          <h3 style="margin:20px 0">结果：{{resultData.result}}</h3>
          <div flex>
            <h3>报错集合：</h3>
            <div>
              <Table
                width="800"
                :show-header="false"
                :columns="errorColumns"
                border
                :data="resultData.errors"
                :disabled-hover="true"
              >
                <template slot="messages" slot-scope="{row}">
                  <template v-for="(v,i) in row.data">
                    <div :key="i">
                      <!-- <h4>imageId:{{v.imageId}}</h4> -->
                      <p flex="cross:center" class="table-item" v-for="(vv,ii) in v.messages" :key="i+ii">{{vv}}</p>
                    </div>
                  </template>
                </template>
              </Table>
            </div>
          </div>
        </div>

        <div
          v-if="resultData.scenes && resultData.scenes.length"
          style="margin-top:10px"
        >
          <Table style="width:100%" :columns="columns" border :data="tableData" :disabled-hover="true">

            <template slot="rules" slot-scope="{row}">
              <p flex="cross:center" class="table-item" v-for="(v,i) in row.rules" :key="i"
              :style="{height:(v.lineTotal||1)*50+'px', width: 'inherit'}"
              >
              <Tooltip :content="v.ruleName" placement="top-start" max-width="300" >
                 <span style="display:inline-block;width:inherit; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"> {{v.ruleName}}：</span>
              </Tooltip >
                  <span :style="{color:v.result?'#666':'#ccc', width: '5rem','text-align': 'right'}">{{v.result}}</span>
                </p>
            </template>


            <template slot="result" slot-scope="{row}">
                <template v-for="(v,i) in row.rules">
                    <p flex="cross:center" class="table-item" v-for="(vv,ii) in v.results" :key="ii+''+i+'6'">
                        第{{ii+1}}行：<span :style="{color:vv.result?'#666':'#ccc'}">{{vv.result}}</span>
                    </p>
                </template>
            </template>


            <template slot="message" slot-scope="{row}">
                <template v-for="(v,i) in row.rules">
                    <p flex="cross:center" class="table-item" v-for="(vv,ii) in v.results" :key="ii+''+i+'6'" :style="{color:vv.message?'#666':'#ccc'}">
                        {{vv.message||'--'}}
                    </p>
                </template>
            </template>


          </Table>
          <div style="height:50px"></div>
        </div>




      </div>
    </div>
    </Modal>
  </div>
</template>

<script>
import jsonEditor from "@/components/json-editor.vue";
export default {
  components: { jsonEditor },
  props: ["open","projectId"],
  data() {
    return {
      step:'init',
      isShow: false,
      json: null,
      projectData: [],
      versionIndex: 0,
      sceneList: [],
      sceneIds: [],
      all: false,
      testLoading: false,
      resultData: {},
      errorColumns: [
        {
          title: "type",
          key: "type",
          width: 150,
        },
        {
          title: "messages",
          slot: "messages",
          minWidth: 500,
        },
      ],
      columns: [
        {
          title: "场景名称",
          key: "sceneName",
          width: 200,
        },
        {
          title: "规则",
          slot: "rules",
          minWidth: 300,
          className: 'vertical-align'
        },
        {
          title: "多行结果",
          slot: "result",
          minWidth: 150,
          className: 'vertical-align'
        },
        {
          title: "报错",
          slot: "message",
          minWidth: 400,
          className: 'vertical-align'
        },
      ],
      tableData:[]
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
    this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      _this.$http
        .get(`/test/initTest?projectId=${_this.projectId}`)
        .then(res => {
          if (res) {
            // console.log()
            _this.projectData = res.data.data.projectData;
            _this.$refs.editor.setValue(JSON.parse(res.data.data.json));
            _this.$refs.editor.refresh()
            _.each(_this.projectData, function(v) {
              v.selected = false;
              if (v.sceneList.length) {
                _.each(v.sceneList, function(vv) {
                  vv.selected = false;
                });
              }
            });
          }
        });
    },
    cancel() {
      this.$parent.openTestModel = false;
    },
    changeVersion(index) {
      var _this = this,
        data = JSON.parse(JSON.stringify(_this.projectData));
      _.each(data, function(v, i) {
        if (i == index) {
          _this.all = false;
          _this.versionIndex = i;
          _this.sceneList = JSON.parse(JSON.stringify(v.sceneList));
          v.selected = true;
        } else {
          v.selected = false;
        }
      });
      _this.projectData = data;
    },
    changeScene(index) {
      if (!this.sceneList[index]["selected"]) {
        this.sceneList[index]["selected"] = true;
      } else {
        this.sceneList[index]["selected"] = false;
      }
    },
    selectAll(val) {
      var _this = this;
      _this.all = val;
      _.each(this.sceneList, function(v) {
        v.selected = val;
      });
    },
    test() {
      let _this = this;

      if (_this.$refs.editor.getValue() == null) {
        return false;
      }

      _this.sceneIds = [];

      _.each(_this.sceneList, function(v) {
        if (v.selected) {
          _this.sceneIds.push(v.id);
        }
      });

      if (!_this.sceneIds.length) {
        _this._N("请先选择场景");
        return false;
      }

      _this.testLoading = true;

      _this.$http
        .post(`/test/execute/rule`, {
          testJson: _this.$refs.editor.getValue(),
          sceneIds: _this.sceneIds
        })
        .then(res => {
          _this.testLoading = false;
          if (res) {
            _this.resultData = res.data.data;
            _this.step="result"

            _.each(_this.resultData.scenes,(v,i)=>{
                    if(v.rules&&v.rules.length){
                        _.each(v.rules,(vv,ii)=>{
                            if(vv.results&&vv.results.length){
                              vv.lineTotal = 0
                              _.each(vv.results,(vvv,iii)=>{
                                    vv.lineTotal++
                              })
                            }
                        })
                    }
            })



          _this.tableData = JSON.parse(JSON.stringify(_this.resultData.scenes))
          }
        });

      //
    }
  }
  // watch:{
  //   '$route.query.type':function(newVal,oldVal){
  //     let _this = this;
  //         if(newVal=='result'){

  //         }
  //   }
  // }
};
</script>
<style scoped lang="less">
[v-cloak] {
  display: none;
}
.top-bar {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 45px;
  background-color: #242737;
  color: #6f79a4;
  z-index: 100;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
.wrap {
  position: absolute;
  left: 0;
  top: 45px;
  width: 100%;
  bottom: 0;
  background-color: #363b53;
  min-width: 1000px;
  overflow-y: auto;
}
.test-btn {
  border: none;
  background-color: #545d81;
  border-radius: 3px;
  padding: 3px 20px;
  cursor: pointer;
  outline: none;
}
.test-btn:hover{
  background-color: #6a7397;
}

.test-box {
  min-width: 250px;
  border: #565c78 1px solid;
  background-color: #33384f;
}
.test-box-title {
  background-color: #565c78;
  height: 40px;
  padding: 0 0 0 10px;
  color: #232737;
}

.test-box-item {
  height: 35px;
  padding: 0 10px;
  border-bottom: #3f445e 1px solid;
  color: #6b7399;
  cursor: pointer;
  margin-right: 0.5px;
}
.test-box-item:last-child {
  border-bottom: none;
}

.table-item {
  height: 50px;
  border-bottom: #eee 1px solid;
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
.table-item:last-child {
  border-bottom: none;
}
.table-item .ivu-tooltip{
  width: calc(100% - 8rem) ;
}
/deep/.table-item .ivu-tooltip .ivu-tooltip-rel {
  width: 100%;
}


.errors-box{
  background-color: #fff;
  border: #eee 1px solid;
}

.errors-item {
  border-bottom: #eee 1px solid;
}

.errors-item p {
  padding:8px 10px
}

.errors-item:last-child {
  border-bottom: none;
}
</style>
