<template>
  <div v-cloak :style="'height:'+divHeight+'px;padding:0 20px;overflow-y:auto'">
    <template v-if="!loading">
      <div class="menu-box">
        <FuncItem :menus="items" style="margin-left:-37px" />
      </div>
      <div style="padding:20px 0">
        <Card :dis-hover="true">
          <p slot="title">components</p>
          <div>
            <div flex class="item">
                  <div style="margin-right:10px">typeDefaultComp:</div>
                  <div><span style="color:#999">纯标题</span></div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeVarOneComp:</div>
                  <div>（<span style="color:#2d8cf0">选择变量</span>）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeVarTwoComp:</div>
                  <div>（<span style="color:#2d8cf0">选择变量</span>，<span style="color:#2d8cf0">选择变量</span>）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeVarMostComp:</div>
                  <div>（<span style="color:#999">请添加变量</span><span style="color:#2d8cf0">+</span>）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeVarStrComp:</div>
                  <div>（
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeVarStrMostComp:</div>
                  <div>（
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ，
                    <span style="color:#2d8cf0">+</span>）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeVarVarStrComp:</div>
                  <div>（
                      <span style="color:#2d8cf0">选择目标变量</span>，
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeVarVarStrMostComp:</div>
                  <div>（
                      <span style="color:#2d8cf0">选择目标变量</span>，
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ，
                    <span style="color:#2d8cf0">+</span>）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeSubstrComp:</div>
                  <div>（
                      <span style="color:#2d8cf0">选择变量</span>，
                      截取：
                      <Input size="small" placeholder="字符串..." style="width: 100px" />）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeSubstrStartEndComp:</div>
                  <div>（
                      <span style="color:#2d8cf0">选择变量</span>，
                      截取：
                      <Input size="small" placeholder="正整数" style="width: 60px" />
                      到
                      <Input size="small" placeholder="正整数" style="width: 60px" />
                      ）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeSubstrNumStrComp:</div>
                  <div>（
                      <span style="color:#2d8cf0">选择变量</span>，
                      截取位：
                      <Input size="small" placeholder="正整数" style="width: 60px" />
                      截取值：
                      <Input size="small" placeholder="字符串" style="width: 60px" />
                      ）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeQunianfenComp:</div>
                  <div>（
                      目标日期：
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                        <Option value="3">当前日期</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeValueComp:</div>
                  <div>（
                      <Select value="1" size="small" style="width:90px;margin-right:5px">
                        <Option value="1">字符串</Option>
                        <Option value="2">数字</Option>
                    </Select>
                    <Input size="small" placeholder="字符串" style="width: 150px" />
                    ）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeDateComp:</div>
                  <div>（
                      <DatePicker size="small" type="date" placeholder="选择日期..." style="width: 150px" />
                    ）</div>
              </div>
                <div flex class="item">
                  <div style="margin-right:10px">typeDateAddComp:</div>
                  <div>（
                      目标日期：
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                        <Option value="3">当前日期</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ,
                    天数：
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeDateSubtractComp:</div>
                  <div>（
                      目标日期：
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                        <Option value="3">当前日期</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ,
                    减去的日期：
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeDatePeriodComp:</div>
                  <div>（
                      起始日期：
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                        <Option value="3">当前日期</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ,
                    目标日期：
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ,
                    截止日期：
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeListComp:</div>
                  <div>（
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______，
                    <span style="color:#2d8cf0;margin-left:5px">规则：</span>_______
                    ，
                    <span style="color:#2d8cf0">+</span>）</div>
              </div>

              <div flex class="item">
                  <div style="margin-right:10px">typeSymbolComp:</div>
                  <div>（起始符，终结符）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeDateMaxSubtractComp:</div>
                  <div>（
                      最大日期：
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ,
                    最小日期：
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______
                    ）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeVarVarStrStrComp:</div>
                  <div>（
                      <span style="color:#2d8cf0">选择目标变量</span>，
                      <Select value="1" size="small" style="width:70px">
                        <Option value="1">变量</Option>
                        <Option value="2">输入</Option>
                    </Select>
                    <span style="color:#2d8cf0;margin-left:5px">变量：</span>_______）</div>
              </div>
              <div flex class="item">
                  <div style="margin-right:10px">typeLoopVarComp:</div>
                  <div>（
                    <span style="color:#2d8cf0">选择目标变量</span>，
                    <span style="color:#2d8cf0">选择集合变量</span>，
                    <span style="color:#2d8cf0">选择集合筛选变量</span>
                  ）</div>
              </div>

          </div>
        </Card>
      </div>
    </template>
    <div v-else style="padding:20px 0">
        数据加载中...
    </div>
  </div>
</template>

<script>
import { GetHeight } from "@/mixins/mixins";
import FuncItem from "@/components/auth-func-item.vue";
export default {
  components: { FuncItem },
  mixins: [GetHeight],
  data() {
    return {
      items: [],
      loading: true,
    };
  },
  computed: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData(varData) {
      var _this = this;
      _this.loading = true;
      _this.$http.get(`/func/tree`).then(function (res) {
        _this.loopData(res.data.data, false);
        _this.items = res.data.data;
        _this.loading = false;
      });
    },
    loopData(arr, value) {
      let _this = this;
      _.each(arr, function (v, i) {
        v.collapse = value;
        if (v.children && v.children.length) {
          _this.loopData(v.children, value);
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
.menu-box {
  /* position: relative; */
  padding: 10px;
  overflow-x: hidden;
  /* height: 300px; */
}
.item{
    padding:10px 0
}
</style>
