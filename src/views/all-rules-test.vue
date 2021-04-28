<template>
  <div class="wrap" v-cloak style="background-color:#292d3e;padding:50px;min-height:100%">
    <div style="background:#fff;padding:20px">
      <h3>单据编号：{{info.bills}}</h3>
      <h3 style="margin:20px 0">结果：{{info.result}}</h3>

      <div flex>
        <h3>报错集合：</h3>
        <div>
          <Table
            :show-header="false"
            :columns="errorColumns"
            border
            :data="info.errors"
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

    <div style="margin:20px 0;background:#fff">

      <Table width="100%" :columns="columns" border :data="tableData" :disabled-hover="true">

        <template slot="sceneName" slot-scope="{row}">
          <p flex="cross:center" class="table-item" v-for="(v,i) in row.scenes" :key="i" :style="{height:(v.lineTotal||1)*50+'px'}">
              {{v.sceneName}}：<span :style="{color:v.result?'#666':'#ccc'}">{{v.result}}</span>
            </p>
        </template>

        
        <template slot="arrays" slot-scope="{row}">
            <template v-for="(v,i) in row.scenes">
                <p flex="cross:center" class="table-item" v-for="(vv,ii) in v.arrays" :key="ii+''+i+'6'" :style="{height:vv.lineTotal*50+'px'}">
                    {{vv.sceneName}}：<span :style="{color:vv.result?'#666':'#ccc'}">{{vv.result}}</span>
                </p>
            </template>
        </template>


        <template slot="rules" slot-scope="{row}">
            <template v-for="(v,i) in row.scenes">
                <template v-for="(vv,ii) in v.arrays">
                    <p flex="cross:center" class="table-item" v-for="(vvv,iii) in vv.rules" :key="iii+''+ii+''+i+'7'" :style="{height:vvv.lineTotal*50+'px'}">
                        {{vvv.ruleId}}：<span :style="{color:vvv.result?'#666':'#ccc'}">{{vvv.result}}</span>
                    </p>
                </template>
            </template>
        </template>


        <template slot="result" slot-scope="{row}">
            <template v-for="(v,i) in row.scenes">
                <template v-for="(vv,ii) in v.arrays">
                    <template v-for="(vvv,iii) in vv.rules">
                        <p :ref="`hieght${iii}`" flex="cross:center" class="table-item" v-for="(vvvv,iiii) in vvv.results" :key="iiii+''+iii+''+ii+''+i+'9'">
                            第{{iiii+1}}行：<span :style="{color:vvvv.result?'#666':'#ccc'}">{{vvvv.result}}</span>
                        </p>
                    </template>
                </template>
            </template>
        </template>


        <template slot="message" slot-scope="{row}">
            <template v-for="(v,i) in row.scenes">
                <template v-for="(vv,ii) in v.arrays">
                    <template v-for="(vvv,iii) in vv.rules">
                        <p flex="cross:center" class="table-item" v-for="(vvvv,iiii) in vvv.results" :key="iiii+''+iii+''+ii+''+i+'8'" :style="{color:vvvv.message?'#666':'#ccc'}">{{vvvv.message||'--'}}</p>
                    </template>
                </template>
            </template>
        </template>



      </Table>
    </div>
  </div>
</template>
v,i
<script>
export default {
  components: {},
  data() {
    return {
      info: {
	"bills": "EME31010000201000042",
	"errors": [{
		"data": [{
			"imageId": "5f980948c9bf3f7165e5a8de",
			"invoiceId": "5f980948c9bf3f7165e5a8de@8107793503912#286968502",
			"messages": ["垫付说明垫付金额与转账凭证金额不一致", "垫付说明签批不全", "垫付说明垫付人与单据收款方不一致"]
		}, {
			"imageId": "5f980948c9bf3f7165e5a8e1",
			"invoiceId": "5f980948c9bf3f7165e5a8e1@9051802522938#439056349",
			"messages": ["理赔分摊表事项未填写"]
		}, {
			"imageId": "5f980948c9bf3f7165e5a8dd",
			"invoiceId": "5f980948c9bf3f7165e5a8dd@031001900104#72967229",
			"messages": ["发票验真失败"]
		}, {
			"imageId": "5f980948c9bf3f7165e5a8e0",
			"invoiceId": "5f980948c9bf3f7165e5a8e0@8061051362897#041979268",
			"messages": ["营业执照经营者与发票销售方不一致"]
		}],
		"type": "IMAGE"
	}, {
		"data": [{
			"messages": ["事由描述有误", "申请人或发票销售方名称与单据收款人名称不一致"]
		}],
		"type": "BILLS"
	}],
	"result": false,
	"versions": [{
		"result": false,
		"scenes": [{
			"arrays": [{
				"result": false,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JK6722181381",
					"ruleName": "发票判断（不为空）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "LA1514027644",
					"ruleName": "单据金额校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": false,
					"results": [{
						"effect": true,
						"index": "$.1",
						"message": "事由描述有误",
						"result": false
					}],
					"ruleId": "MN8785728713",
					"ruleName": "单据事由敏感词校验",
					"ruleType": 0
				}],
				"sceneId": 106,
				"sceneName": "单据通用规则"
			}],
			"result": false,
			"sceneId": 106,
			"sceneName": "单据通用规则"
		}, {
			"arrays": [{
				"result": false,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "RC5206672903",
					"ruleName": "专票判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "ZZ4730535836",
					"ruleName": "发票判断（普票、卷票、机动车发票、通用机打发票）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "UP5237645802",
					"ruleName": "发票联次校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JR4971650483",
					"ruleName": "发票日期校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "XS5989601595",
					"ruleName": "发票购买方名称校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JS1309491433",
					"ruleName": "发票购买方税号校验",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "TV2763887479",
					"ruleName": "专票、普票判断",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "UN2270185210",
					"ruleName": "发票号码代码校验",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "WM8555600905",
					"ruleName": "火车票判断",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "AT8252528443",
					"ruleName": "发票专用章校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": false,
					"results": [{
						"effect": true,
						"imageId": "5f980948c9bf3f7165e5a8dd",
						"index": "$.1",
						"invoiceId": "5f980948c9bf3f7165e5a8dd@031001900104#72967229",
						"message": "发票验真失败",
						"result": false
					}],
					"ruleId": "PR7237233094",
					"ruleName": "发票验真校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "CV9877810568",
					"ruleName": "发票验重校验",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "CT2969116486",
					"ruleName": "单据类型判断（手续费）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "XT3201900906",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "YP9420008279",
					"ruleName": "招待费必备附件校验（发票）",
					"ruleType": 1
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "AD2605424463",
					"ruleName": "招待费发票项目校验",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "ZR3335799156",
					"ruleName": "单据类型判断（单证报销单）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "BD3019727056",
					"ruleName": "单据判断（反冲、重新支付）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "PJ2010058503",
					"ruleName": "单据个人手续费判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "XZ7633274164",
					"ruleName": "单据发票判断",
					"ruleType": 0
				}, {
					"effect": true,
					"result": false,
					"results": [{
						"effect": true,
						"index": "$.1",
						"message": "申请人或发票销售方名称与单据收款人名称不一致",
						"result": false
					}],
					"ruleId": "AU3710497231",
					"ruleName": "单据收款人名称校验",
					"ruleType": 0
				}],
				"sceneId": 107,
				"sceneKey": "invoices",
				"sceneName": "发票(1)"
			}],
			"result": false,
			"sceneId": 107,
			"sceneKey": "invoices",
			"sceneName": "发票"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "XG7907303413",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "MS2571193923",
					"ruleName": "招待费必备附件校验（业务招待表）",
					"ruleType": 1
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "LN7889448222",
					"ruleName": "头信息金额判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "KE5099860790",
					"ruleName": "招待费附件判断（业务招待表）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "FN2266246809",
					"ruleName": "单据类型判断（手续费、重新支付、反冲）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "UB8840322284",
					"ruleName": "收款方头信息总金额小于2000判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "GX4978530146",
					"ruleName": "收款方判断（小于2000）",
					"ruleType": 0
				}],
				"sceneId": 108,
				"sceneKey": "others",
				"sceneName": "接待审批表(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "XG7907303413",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "MS2571193923",
					"ruleName": "招待费必备附件校验（业务招待表）",
					"ruleType": 1
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "LN7889448222",
					"ruleName": "头信息金额判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "KE5099860790",
					"ruleName": "招待费附件判断（业务招待表）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "FN2266246809",
					"ruleName": "单据类型判断（手续费、重新支付、反冲）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "UB8840322284",
					"ruleName": "收款方头信息总金额小于2000判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "GX4978530146",
					"ruleName": "收款方判断（小于2000）",
					"ruleType": 0
				}],
				"sceneId": 108,
				"sceneKey": "others",
				"sceneName": "接待审批表(2)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "XG7907303413",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "MS2571193923",
					"ruleName": "招待费必备附件校验（业务招待表）",
					"ruleType": 1
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "LN7889448222",
					"ruleName": "头信息金额判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "KE5099860790",
					"ruleName": "招待费附件判断（业务招待表）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "FN2266246809",
					"ruleName": "单据类型判断（手续费、重新支付、反冲）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "UB8840322284",
					"ruleName": "收款方头信息总金额小于2000判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "GX4978530146",
					"ruleName": "收款方判断（小于2000）",
					"ruleType": 0
				}],
				"sceneId": 108,
				"sceneKey": "others",
				"sceneName": "接待审批表(3)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "XG7907303413",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "MS2571193923",
					"ruleName": "招待费必备附件校验（业务招待表）",
					"ruleType": 1
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "LN7889448222",
					"ruleName": "头信息金额判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "KE5099860790",
					"ruleName": "招待费附件判断（业务招待表）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "FN2266246809",
					"ruleName": "单据类型判断（手续费、重新支付、反冲）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "UB8840322284",
					"ruleName": "收款方头信息总金额小于2000判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "GX4978530146",
					"ruleName": "收款方判断（小于2000）",
					"ruleType": 0
				}],
				"sceneId": 108,
				"sceneKey": "others",
				"sceneName": "接待审批表(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "XG7907303413",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "MS2571193923",
					"ruleName": "招待费必备附件校验（业务招待表）",
					"ruleType": 1
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "LN7889448222",
					"ruleName": "头信息金额判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "KE5099860790",
					"ruleName": "招待费附件判断（业务招待表）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "QD5410155434",
					"ruleName": "招待费接待年份校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "KW6360151310",
					"ruleName": "招待类别校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JB4018764102",
					"ruleName": "招待审批表事由校验",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "FN2266246809",
					"ruleName": "单据类型判断（手续费、重新支付、反冲）",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "UB8840322284",
					"ruleName": "收款方头信息总金额小于2000判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "GX4978530146",
					"ruleName": "收款方判断（小于2000）",
					"ruleType": 0
				}],
				"sceneId": 108,
				"sceneKey": "others",
				"sceneName": "接待审批表(5)"
			}],
			"result": true,
			"sceneId": 108,
			"sceneKey": "others",
			"sceneName": "接待审批表"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "BS5846973949",
					"ruleName": "单据类型判断（单证报销单）",
					"ruleType": 0
				}],
				"sceneId": 109,
				"sceneKey": "others",
				"sceneName": "单证报销单(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "BS5846973949",
					"ruleName": "单据类型判断（单证报销单）",
					"ruleType": 0
				}],
				"sceneId": 109,
				"sceneKey": "others",
				"sceneName": "单证报销单(2)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "BS5846973949",
					"ruleName": "单据类型判断（单证报销单）",
					"ruleType": 0
				}],
				"sceneId": 109,
				"sceneKey": "others",
				"sceneName": "单证报销单(3)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "BS5846973949",
					"ruleName": "单据类型判断（单证报销单）",
					"ruleType": 0
				}],
				"sceneId": 109,
				"sceneKey": "others",
				"sceneName": "单证报销单(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "BS5846973949",
					"ruleName": "单据类型判断（单证报销单）",
					"ruleType": 0
				}],
				"sceneId": 109,
				"sceneKey": "others",
				"sceneName": "单证报销单(5)"
			}],
			"result": true,
			"sceneId": 109,
			"sceneKey": "others",
			"sceneName": "单证报销单"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "RA2307773829",
					"ruleName": "单据类型判断（重新支付付款单）",
					"ruleType": 0
				}],
				"sceneId": 110,
				"sceneKey": "others",
				"sceneName": "重新支付付款单(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "RA2307773829",
					"ruleName": "单据类型判断（重新支付付款单）",
					"ruleType": 0
				}],
				"sceneId": 110,
				"sceneKey": "others",
				"sceneName": "重新支付付款单(2)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "RA2307773829",
					"ruleName": "单据类型判断（重新支付付款单）",
					"ruleType": 0
				}],
				"sceneId": 110,
				"sceneKey": "others",
				"sceneName": "重新支付付款单(3)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "RA2307773829",
					"ruleName": "单据类型判断（重新支付付款单）",
					"ruleType": 0
				}],
				"sceneId": 110,
				"sceneKey": "others",
				"sceneName": "重新支付付款单(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "RA2307773829",
					"ruleName": "单据类型判断（重新支付付款单）",
					"ruleType": 0
				}],
				"sceneId": 110,
				"sceneKey": "others",
				"sceneName": "重新支付付款单(5)"
			}],
			"result": true,
			"sceneId": 110,
			"sceneKey": "others",
			"sceneName": "重新支付付款单"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "TS3762753970",
					"ruleName": "附件判断（垫付说明）",
					"ruleType": 0
				}],
				"sceneId": 111,
				"sceneKey": "others",
				"sceneName": "垫付说明(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "TS3762753970",
					"ruleName": "附件判断（垫付说明）",
					"ruleType": 0
				}],
				"sceneId": 111,
				"sceneKey": "others",
				"sceneName": "垫付说明(2)"
			}, {
				"result": false,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "TS3762753970",
					"ruleName": "附件判断（垫付说明）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": false,
					"results": [{
						"effect": true,
						"imageId": "5f980948c9bf3f7165e5a8de",
						"index": "$.3",
						"invoiceId": "5f980948c9bf3f7165e5a8de@8107793503912#286968502",
						"message": "垫付说明垫付金额与转账凭证金额不一致",
						"result": false
					}],
					"ruleId": "YV9662637953",
					"ruleName": "垫付金额校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": false,
					"results": [{
						"effect": true,
						"imageId": "5f980948c9bf3f7165e5a8de",
						"index": "$.3",
						"invoiceId": "5f980948c9bf3f7165e5a8de@8107793503912#286968502",
						"message": "垫付说明签批不全",
						"result": false
					}],
					"ruleId": "PC9476403170",
					"ruleName": "垫付说明负责人签批校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": false,
					"results": [{
						"effect": true,
						"imageId": "5f980948c9bf3f7165e5a8de",
						"index": "$.3",
						"invoiceId": "5f980948c9bf3f7165e5a8de@8107793503912#286968502",
						"message": "垫付说明垫付人与单据收款方不一致",
						"result": false
					}],
					"ruleId": "TG1380488455",
					"ruleName": "垫付人校验",
					"ruleType": 0
				}],
				"sceneId": 111,
				"sceneKey": "others",
				"sceneName": "垫付说明(3)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "TS3762753970",
					"ruleName": "附件判断（垫付说明）",
					"ruleType": 0
				}],
				"sceneId": 111,
				"sceneKey": "others",
				"sceneName": "垫付说明(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "TS3762753970",
					"ruleName": "附件判断（垫付说明）",
					"ruleType": 0
				}],
				"sceneId": 111,
				"sceneKey": "others",
				"sceneName": "垫付说明(5)"
			}],
			"result": false,
			"sceneId": 111,
			"sceneKey": "others",
			"sceneName": "垫付说明"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "PZ8401019048",
					"ruleName": "收款证明判断",
					"ruleType": 0
				}],
				"sceneId": 113,
				"sceneKey": "others",
				"sceneName": "收款证明(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "PZ8401019048",
					"ruleName": "收款证明判断",
					"ruleType": 0
				}],
				"sceneId": 113,
				"sceneKey": "others",
				"sceneName": "收款证明(2)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "PZ8401019048",
					"ruleName": "收款证明判断",
					"ruleType": 0
				}],
				"sceneId": 113,
				"sceneKey": "others",
				"sceneName": "收款证明(3)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "PZ8401019048",
					"ruleName": "收款证明判断",
					"ruleType": 0
				}],
				"sceneId": 113,
				"sceneKey": "others",
				"sceneName": "收款证明(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "PZ8401019048",
					"ruleName": "收款证明判断",
					"ruleType": 0
				}],
				"sceneId": 113,
				"sceneKey": "others",
				"sceneName": "收款证明(5)"
			}],
			"result": true,
			"sceneId": 113,
			"sceneKey": "others",
			"sceneName": "收款证明"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "CJ7760308837",
					"ruleName": "附件类型判断（预算动支）",
					"ruleType": 0
				}],
				"sceneId": 114,
				"sceneKey": "others",
				"sceneName": "动支单(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "CJ7760308837",
					"ruleName": "附件类型判断（预算动支）",
					"ruleType": 0
				}],
				"sceneId": 114,
				"sceneKey": "others",
				"sceneName": "动支单(2)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "CJ7760308837",
					"ruleName": "附件类型判断（预算动支）",
					"ruleType": 0
				}],
				"sceneId": 114,
				"sceneKey": "others",
				"sceneName": "动支单(3)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "CJ7760308837",
					"ruleName": "附件类型判断（预算动支）",
					"ruleType": 0
				}],
				"sceneId": 114,
				"sceneKey": "others",
				"sceneName": "动支单(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "CJ7760308837",
					"ruleName": "附件类型判断（预算动支）",
					"ruleType": 0
				}],
				"sceneId": 114,
				"sceneKey": "others",
				"sceneName": "动支单(5)"
			}],
			"result": true,
			"sceneId": 114,
			"sceneKey": "others",
			"sceneName": "动支单"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "XK1776949697",
					"ruleName": "附件类型判断（理赔分摊表）",
					"ruleType": 0
				}],
				"sceneId": 115,
				"sceneKey": "others",
				"sceneName": "理赔分摊(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "XK1776949697",
					"ruleName": "附件类型判断（理赔分摊表）",
					"ruleType": 0
				}],
				"sceneId": 115,
				"sceneKey": "others",
				"sceneName": "理赔分摊(2)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "XK1776949697",
					"ruleName": "附件类型判断（理赔分摊表）",
					"ruleType": 0
				}],
				"sceneId": 115,
				"sceneKey": "others",
				"sceneName": "理赔分摊(3)"
			}, {
				"result": false,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "XK1776949697",
					"ruleName": "附件类型判断（理赔分摊表）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": false,
					"results": [{
						"effect": true,
						"imageId": "5f980948c9bf3f7165e5a8e1",
						"index": "$.4",
						"invoiceId": "5f980948c9bf3f7165e5a8e1@9051802522938#439056349",
						"message": "理赔分摊表事项未填写",
						"result": false
					}],
					"ruleId": "DG7623923153",
					"ruleName": "理赔分摊表事项校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "RC6017694455",
					"ruleName": "理赔分摊依据校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "NY9176551649",
					"ruleName": "理赔部负责人与经办人签字校验",
					"ruleType": 0
				}],
				"sceneId": 115,
				"sceneKey": "others",
				"sceneName": "理赔分摊(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "XK1776949697",
					"ruleName": "附件类型判断（理赔分摊表）",
					"ruleType": 0
				}],
				"sceneId": 115,
				"sceneKey": "others",
				"sceneName": "理赔分摊(5)"
			}],
			"result": false,
			"sceneId": 115,
			"sceneKey": "others",
			"sceneName": "理赔分摊"
		}, {
			"arrays": [{
				"result": false,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "EW1248815600",
					"ruleName": "附件类型判断（营业执照）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": false,
					"results": [{
						"effect": true,
						"imageId": "5f980948c9bf3f7165e5a8e0",
						"index": "$.1",
						"invoiceId": "5f980948c9bf3f7165e5a8e0@8061051362897#041979268",
						"message": "营业执照经营者与发票销售方不一致",
						"result": false
					}],
					"ruleId": "YF3170799713",
					"ruleName": "营业执照经营者校验",
					"ruleType": 0
				}],
				"sceneId": 116,
				"sceneKey": "others",
				"sceneName": "个体工商户营业执照(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "EW1248815600",
					"ruleName": "附件类型判断（营业执照）",
					"ruleType": 0
				}],
				"sceneId": 116,
				"sceneKey": "others",
				"sceneName": "个体工商户营业执照(2)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "EW1248815600",
					"ruleName": "附件类型判断（营业执照）",
					"ruleType": 0
				}],
				"sceneId": 116,
				"sceneKey": "others",
				"sceneName": "个体工商户营业执照(3)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "EW1248815600",
					"ruleName": "附件类型判断（营业执照）",
					"ruleType": 0
				}],
				"sceneId": 116,
				"sceneKey": "others",
				"sceneName": "个体工商户营业执照(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "EW1248815600",
					"ruleName": "附件类型判断（营业执照）",
					"ruleType": 0
				}],
				"sceneId": 116,
				"sceneKey": "others",
				"sceneName": "个体工商户营业执照(5)"
			}],
			"result": false,
			"sceneId": 116,
			"sceneKey": "others",
			"sceneName": "个体工商户营业执照"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JY6886537985",
					"ruleName": "其余附件校验",
					"ruleType": 0
				}],
				"sceneId": 117,
				"sceneKey": "others",
				"sceneName": "附件表(1)"
			}, {
				"result": true,
				"rules": [{
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JY6886537985",
					"ruleName": "其余附件校验",
					"ruleType": 0
				}],
				"sceneId": 117,
				"sceneKey": "others",
				"sceneName": "附件表(2)"
			}, {
				"result": true,
				"rules": [{
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JY6886537985",
					"ruleName": "其余附件校验",
					"ruleType": 0
				}],
				"sceneId": 117,
				"sceneKey": "others",
				"sceneName": "附件表(3)"
			}, {
				"result": true,
				"rules": [{
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JY6886537985",
					"ruleName": "其余附件校验",
					"ruleType": 0
				}],
				"sceneId": 117,
				"sceneKey": "others",
				"sceneName": "附件表(4)"
			}, {
				"result": true,
				"rules": [{
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "JY6886537985",
					"ruleName": "其余附件校验",
					"ruleType": 0
				}],
				"sceneId": 117,
				"sceneKey": "others",
				"sceneName": "附件表(5)"
			}],
			"result": true,
			"sceneId": 117,
			"sceneKey": "others",
			"sceneName": "附件表"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "MG2729696539",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "FD2374431706",
					"ruleName": "招待费险种校验",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "YW6592908609",
					"ruleName": "理赔比例校验",
					"ruleType": 2
				}],
				"sceneId": 118,
				"sceneKey": "detailItems",
				"sceneName": "费用明细区(1)"
			}],
			"result": true,
			"sceneId": 118,
			"sceneKey": "detailItems",
			"sceneName": "费用明细区"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "PQ4986813366",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "WA4538123044",
					"ruleName": "招待费超标标准校验",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "GF4020681461",
					"ruleName": "招待审批表判断",
					"ruleType": 0
				}],
				"sceneId": 119,
				"sceneKey": "standardItems",
				"sceneName": "会议/招待标准区(1)"
			}],
			"result": true,
			"sceneId": 119,
			"sceneKey": "standardItems",
			"sceneName": "会议/招待标准区"
		}, {
			"arrays": [{
				"result": true,
				"rules": [{
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "TY7681019973",
					"ruleName": "单据类型判断（招待费）",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "BD3610058020",
					"ruleName": "招待费付款用途校验",
					"ruleType": 0
				}, {
					"effect": false,
					"result": true,
					"results": [{
						"effect": false,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "QX1024453693",
					"ruleName": "理赔比例为全0判断",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "DC8700648793",
					"ruleName": "理赔比例为0现金流校验",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "TA5164336342",
					"ruleName": "理赔比例为全100判断",
					"ruleType": 0
				}, {
					"effect": false,
					"result": false,
					"results": [{
						"effect": false,
						"result": false
					}],
					"ruleId": "WD9325673454",
					"ruleName": "理赔比例为全0或100判断",
					"ruleType": 0
				}, {
					"effect": true,
					"result": true,
					"results": [{
						"effect": true,
						"index": "$.1",
						"result": true
					}],
					"ruleId": "ML5555288485",
					"ruleName": "单据冲销金额校验-付款区",
					"ruleType": 0
				}],
				"sceneId": 120,
				"sceneKey": "payItems",
				"sceneName": "付款区(1)"
			}],
			"result": true,
			"sceneId": 120,
			"sceneKey": "payItems",
			"sceneName": "付款区"
		}],
		"version": "财审规则V1.2"
	}]
},
      errorColumns: [
        {
          title: "type",
          key: "type",
          width: 200,
        },
        {
          title: "messages",
          slot: "messages",
          minWidth: 600,
        },
      ],
      columns: [
        {
          title: "版本",
          key: "version",
          width: 200,
        },
        {
          title: "场景名称",
          slot: "sceneName",
          minWidth: 250,
        },
        {
          title: "影像或数组",
          slot: "arrays",
          minWidth: 250,
          className: 'vertical-align'
        },
        {
          title: "规则",
          slot: "rules",
          minWidth: 200,
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
    
    let _this = this;

      _.each(_this.info.versions,function(v,i){
        //   v.lineTotal = v.scenes.length;
          if(v.scenes&&v.scenes.length){
            _.each(v.scenes,(vv,ii)=>{
                
                    if(vv.arrays&&vv.arrays.length){
                        vv.lineTotal = 0;
                        _.each(vv.arrays,(vvv,iii)=>{
                            if(vvv.rules&&vvv.rules.length){
                                vvv.lineTotal = 0;
                                _.each(vvv.rules,(vvvv,iiii)=>{
                                    vvvv.lineTotal = vvvv.results.length
                                    vvv.lineTotal+=vvvv.results.length
                                })
                                vv.lineTotal += vvv.lineTotal
                            }
                        })
                    }
                    
            })
          }
      })
    

    _this.tableData = JSON.parse(JSON.stringify(_this.info.versions))

  },
  methods: {


  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.wrap {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}


.table-item {
  height: 50px;
  border-bottom: #eee 1px solid;
  color: #666;
  padding: 0 15px;
  margin:0 -18px;
  overflow: hidden;
}


</style>
