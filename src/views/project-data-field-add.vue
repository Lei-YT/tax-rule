<template>
  <div v-cloak>
    <Modal v-model="isShow" width="460" :mask-closable="false" draggable @on-cancel="cancel">
      <p slot="header">
        <b>
          添加字段
          <span style="color:#999">（{{tableType}}）</span>
        </b>
      </p>

      <div>
        <template v-if="tableType=='影像表'">
          <div class="form-item">
            <p class="form-item-title">
              字段名称
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Input v-model="formData.name" placeholder="请输入..." type="text" />
            </p>
          </div>
          <div class="form-item">
            <p class="form-item-title">
              字段类型
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Select v-model="formData.type" placeholder="请选择...">
                <Option v-for="vo in typeList" :key="vo" :value="vo">{{vo}}</Option>
              </Select>
            </p>
          </div>
          <div class="form-item">
            <p class="form-item-title">
              JsonPath
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Input v-model="formData.jsonpath" placeholder="请输入..." type="text" />
            </p>
          </div>
          <div class="form-item" flex>
            <p class="form-item-title">
              是否必有
              <span style="color:red;">✲</span>
            </p>
            <p style="margin-left:30px">
              <RadioGroup
                v-model="formData.isTrans"
                @on-change="($event==0)?formData.defaultValue='':''"
              >
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
              </RadioGroup>
            </p>
          </div>
          <div class="form-item" v-if="formData.isTrans">
            <p class="form-item-title">默认值</p>
            <p>
              <Input v-model="formData.defaultValue" placeholder="请输入..." type="text" />
            </p>
          </div>
          <div class="form-item" flex>
            <p class="form-item-title">
              是否特殊
              <span style="color:red;">✲</span>
            </p>
            <p style="margin-left:30px">
              <RadioGroup v-model="formData.isSpecial">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
              </RadioGroup>
            </p>
          </div>
          <div class="form-item">
            <p class="form-item-title">备注</p>
            <p>
              <Input v-model="formData.remark" placeholder="请输入..." type="text" />
            </p>
          </div>
        </template>

        <template v-if="tableType=='虚拟表'">
          <div class="form-item">
            <p class="form-item-title">
              字段名称
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Input v-model="formData.name" placeholder="请输入..." type="text" />
            </p>
          </div>
          <div class="form-item">
            <p class="form-item-title">
              字段类型
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Select v-model="formData.type" placeholder="请选择...">
                <Option v-for="vo in typeList" :key="vo" :value="vo">{{vo}}</Option>
              </Select>
            </p>
          </div>
          <div class="form-item">
            <p class="form-item-title">
              JsonPath
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Input v-model="formData.jsonpath" placeholder="请输入..." type="text" />
            </p>
          </div>
          <div class="form-item" flex>
            <p class="form-item-title">
              是否特殊
              <span style="color:red;">✲</span>
            </p>
            <p style="margin-left:30px">
              <RadioGroup v-model="formData.isSpecial">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
              </RadioGroup>
            </p>
          </div>

          <div class="form-item">
            <p class="form-item-title">备注</p>
            <p>
              <Input v-model="formData.remark" placeholder="请输入..." type="text" />
            </p>
          </div>
        </template>

        <template v-if="tableType=='数据表'">
          <div class="form-item">
            <p class="form-item-title">
              字段名称
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Input v-model="formData.name" placeholder="请输入..." type="text" />
            </p>
          </div>
          <div class="form-item">
            <p class="form-item-title">
              字段类型
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Select v-model="formData.type" placeholder="请选择...">
                <Option v-for="vo in typeList" :key="vo" :value="vo">{{vo}}</Option>
              </Select>
            </p>
          </div>
          <div class="form-item">
            <p class="form-item-title">
              JsonPath
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Input v-model="formData.jsonpath" placeholder="请输入..." type="text" />
            </p>
          </div>
          <div class="form-item" flex>
            <p class="form-item-title">
              是否特殊
              <span style="color:red;">✲</span>
            </p>
            <p style="margin-left:30px">
              <RadioGroup v-model="formData.isSpecial">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
              </RadioGroup>
            </p>
          </div>
          <!-- <div class="form-item">
            <p class="form-item-title">默认值</p>
            <p>
              <Input v-model="formData.defaultValue" placeholder="请输入..." type="text" />
            </p>
          </div>-->
          <div class="form-item">
            <p class="form-item-title">备注</p>
            <p>
              <Input v-model="formData.remark" placeholder="请输入..." type="text" />
            </p>
          </div>
        </template>

        <template v-if="tableType=='规则表'">
          <div class="form-item">
            <p class="form-item-title">
              字段名称
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Input v-model="formData.name" placeholder="请输入..." type="text" />
            </p>
          </div>

          <div class="form-item">
            <p class="form-item-title">
              参数
              <span style="color:red;">✲</span>
            </p>
            <p>
              <Input v-model="formData.parameter" placeholder="请输入..." type="text" />
            </p>
          </div>
          <div class="form-item" flex>
            <p class="form-item-title">
              是否特殊
              <span style="color:red;">✲</span>
            </p>
            <p style="margin-left:30px">
              <RadioGroup v-model="formData.isSpecial">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
              </RadioGroup>
            </p>
          </div>

          <div class="form-item">
            <p class="form-item-title">备注</p>
            <p>
              <Input v-model="formData.remark" placeholder="请输入..." type="text" />
            </p>
          </div>
        </template>
      </div>

      <div slot="footer" flex>
        <div flex-box="0">
          <Button @click="cancel">取消</Button>
        </div>
        <div flex-box="1"></div>
        <div flex-box="0">
          <Button :loading="submitLoading" type="success" @click="save">提交</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ["open", "tableId", "projectId", "tableType"],
  data() {
    return {
      isShow: false,
      formData: {
        isSpecial: 0,
        isTrans: 0,
        tableId: Number(1),
        projectId: Number(1),
        type: "String",
      },
      typeList: ["Integer", "String", "Double", "Boolean", "Date", "List"],
      submitLoading: false,
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    _this.isShow = _this.open;
  },
  methods: {
    save() {
      var _this = this;

      if (!_this.formData.name) {
        _this._N("请输入字段名称");
        return false;
      }

      if (!_this.formData.jsonpath && _this.tableType != "规则表") {
        _this._N("请输入JsonPath");
        return false;
      }

      if (!_this.formData.parameter && _this.tableType == "规则表") {
        _this._N("请输入参数");
        return false;
      }

      if (
        _this.formData.isTrans &&
        !_this.formData.defaultValue &&
        _this.tableType == "影像表"
      ) {
        _this._N("请输入默认值");
        return false;
      }

      // if (!_this.formData.remark) {
      //   _this._N("请输入备注");
      //   return false;
      // }

      _this.formData.tableId = _this.tableId;
      _this.formData.projectId = _this.projectId;

      _this.submitLoading = true;
      _this.$http.post(`/data/addField`, _this.formData).then((res) => {
        if (res) {
          _this.isShow = false;
          _this.$parent.openFieldAddModel = false;
          _this.$parent.getFieldData();
        } else {
          _this.submitLoading = false;
        }
      });
    },
    cancel() {
      this.$parent.openFieldAddModel = false;
    },
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.form-item {
  /* border-bottom: #eee 1px solid; */
  padding: 7px 0;
}
.form-item .form-item-title {
  margin-bottom: 5px;
  overflow: hidden;
}
</style>
<style>
.diy-model-body .ivu-modal-body {
  height: 500px;
  overflow-y: auto;
}
</style>

