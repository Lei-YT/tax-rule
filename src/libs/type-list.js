const data = [
    {
        "name": "变量",
        "children": [{
                "id": 1,
                "name": "发票",
                "children": [{
                        "id": "1",
                        "name": "发票金额",
                        "jsonpath": "$.salary",
                        "type": "BigDecimal",
                        "remark": ""
                    }, {
                        "id": "2",
                        "name": "发票日期",
                        "jsonpath": "$.billDate", 
                        "type": "Date"
                    },
                    {
                        "id": "3",
                        "name": " 购买方名称",
                        "jsonpath": "$.purchaserName",
                        "type": "String"
                    }, {
                        "id": "4",
                        "name": "购买方纳税人识别号",
                        "jsonpath": "$.purchaserNumber",
                        "type": "String"
                    }, {
                        "id": "5",
                        "name": "发票项目",
                        "jsonpath": "$.billItem",
                        "type": "String"
                    }, {
                        "id": "6",
                        "name": "销售方名称",
                        "jsonpath": "$.sellerName",
                        "type": "String"
                    }
                ]
            },
            {
                "id": "2",
                "name": "电商化",
                "children": [{
                    "id": "7",
                    "name": "姓名",
                    "jsonpath": "$.name",
                    "type": "String"
                }, {
                    "id": "8",
                    "name": "职级",
                    "jsonpath": "$.post",
                    "type": "String"
                }, {
                    "id": "9",
                    "name": "报销金额",
                    "jsonpath": "$.amount",
                    "type": "BigDecimal"
                }, {
                    "id": "10",
                    "name": "法律主体",
                    "jsonpath": "$.legalSubject",
                    "type": "String"
                }, {
                    "id": "11",
                    "name": "法律主体识别号",
                    "jsonpath": "$.subjectNumber",
                    "type": "String"
                }, {
                    "id": "12",
                    "name": "报销项目",
                    "jsonpath": "$.reimburseItem",
                    "type": "String"
                }, {
                    "id": "13",
                    "name": "行说明",
                    "jsonpath": "$.lineDesc",
                    "type": "String"
                }]
            }
        ]
    },
    {
        "id": 1,
        "name": "函数",
        "funcAlias": null,
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "函数",
                "funcAlias": null,
                "pid": 1,
                "children": [
                    {
                        "id": 3,
                        "name": "求绝对值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 4,
                        "name": "求平均值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 5,
                        "name": "求和",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 6,
                        "name": "求最大值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 7,
                        "name": "求最小值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 8,
                        "name": "计算字符长度",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 9,
                        "name": "字符去空格",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 10,
                        "name": "截取X之后的值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 11,
                        "name": "截取X之前的值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 12,
                        "name": "截第X位之后的值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 13,
                        "name": "截第X位之前的值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 14,
                        "name": "截取第X位到第Y位中间的值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 15,
                        "name": "截取第X个X值之前值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    },
                    {
                        "id": 16,
                        "name": "截取第X个X值之后值",
                        "funcAlias": null,
                        "pid": 2,
                        "children": []
                    }
                ]
            },
            {
                "id": 17,
                "name": "字符转换",
                "funcAlias": null,
                "pid": 1,
                "children": [
                    {
                        "id": 18,
                        "name": "大写转小写",
                        "funcAlias": null,
                        "pid": 17,
                        "children": []
                    },
                    {
                        "id": 19,
                        "name": "小写转大写",
                        "funcAlias": null,
                        "pid": 17,
                        "children": []
                    },
                    {
                        "id": 20,
                        "name": "英文符号转中文符号",
                        "funcAlias": null,
                        "pid": 17,
                        "children": []
                    },
                    {
                        "id": 21,
                        "name": "中文符号转英文符号",
                        "funcAlias": null,
                        "pid": 17,
                        "children": []
                    }
                ]
            },
            {
                "id": 22,
                "name": "集合",
                "funcAlias": null,
                "pid": 1,
                "children": [
                    {
                        "id": 23,
                        "name": "List集合",
                        "funcAlias": null,
                        "pid": 22,
                        "children": []
                    },
                    {
                        "id": 24,
                        "name": "Map集合",
                        "funcAlias": null,
                        "pid": 22,
                        "children": []
                    },
                    {
                        "id": 25,
                        "name": "List集合共有条件",
                        "funcAlias": null,
                        "pid": 22,
                        "children": []
                    },
                    {
                        "id": 26,
                        "name": "Map集合共有条件",
                        "funcAlias": null,
                        "pid": 22,
                        "children": []
                    }
                ]
            },
            {
                "id": 27,
                "name": "比较符",
                "funcAlias": null,
                "pid": 1,
                "children": [
                    {
                        "id": 28,
                        "name": "小于",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 29,
                        "name": "大于",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 30,
                        "name": "小于或等于",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 31,
                        "name": "大于或等于",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 32,
                        "name": "等于",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 33,
                        "name": "等于(不分大小写)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 373,
                        "name": "不等于",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 34,
                        "name": "在集合",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 35,
                        "name": "不在集合",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 36,
                        "name": "为空",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 37,
                        "name": "不为空",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 3646,
                        "name": "为空(且)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 3637,
                        "name": "为空(或)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 3546,
                        "name": "不为空(且)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 3437,
                        "name": "不为空(或)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 38,
                        "name": "包含",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 39,
                        "name": "不包含",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 40,
                        "name": "包含(且)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 41,
                        "name": "包含(或)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 42,
                        "name": "不包含(且)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 43,
                        "name": "不包含(或)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                ]
            },
            {
                "id": 100,
                "name": "集合比对",
                "funcAlias": null,
                "pid": 1,
                "children": [
                    {
                        "id": 44,
                        "name": "一一匹配(按顺序)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 45,
                        "name": "一一匹配(不按顺序)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 46,
                        "name": "一一匹配(按字段列不按顺序)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 47,
                        "name": "一一匹配(按字段行不按顺序)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    },
                    {
                        "id": 48,
                        "name": "一一匹配(按特定字段且按此字段行)",
                        "funcAlias": null,
                        "pid": 27,
                        "children": []
                    }
                ]
            },
            {
                "id": 54,
                "name": "赋值",
                "funcAlias": null,
                "pid": 1,
                "children": []
            }
        ]
    },
    {
        "id": 55,
        "name": "运算符",
        "funcAlias": null,
        "pid": 0,
        "children": [
            {
                "id": 56,
                "name": "加",
                "funcAlias": null,
                "pid": 55,
                "children": []
            },
            {
                "id": 57,
                "name": "减",
                "funcAlias": null,
                "pid": 55,
                "children": []
            },
            {
                "id": 58,
                "name": "乘",
                "funcAlias": null,
                "pid": 55,
                "children": []
            },
            {
                "id": 59,
                "name": "除",
                "funcAlias": null,
                "pid": 55,
                "children": []
            },
            {
                "id": 60,
                "name": "约等于",
                "funcAlias": null,
                "pid": 55,
                "children": []
            }
        ]
    },
    {
        "id": 61,
        "name": "括号",
        "funcAlias": null,
        "pid": 0,
        "children": []
    },
    {
        "id": 62,
        "name": "值",
        "funcAlias": null,
        "pid": 0,
        "children": []
    },
    {
        "id": 63,
        "name": "日期计算",
        "funcAlias": null,
        "pid": 0,
        "children": [
            {
                "id": 64,
                "name": "当前日期",
                "funcAlias": null,
                "pid": 63,
                "children": []
            },
            {
                "id": 65,
                "name": "取年份",
                "funcAlias": null,
                "pid": 63,
                "children": []
            },
            {
                "id": 66,
                "name": "取月份",
                "funcAlias": null,
                "pid": 63,
                "children": []
            },
            {
                "id": 67,
                "name": "日期加天",
                "funcAlias": null,
                "pid": 63,
                "children": []
            },
            {
                "id": 68,
                "name": "日期加月",
                "funcAlias": null,
                "pid": 63,
                "children": []
            },
            {
                "id": 69,
                "name": "日期加年",
                "funcAlias": null,
                "pid": 63,
                "children": []
            },
            {
                "id": 70,
                "name": "日期相减返回天",
                "funcAlias": null,
                "pid": 63,
                "children": []
            },
            {
                "id": 71,
                "name": "日期相减返回月",
                "funcAlias": null,
                "pid": 63,
                "children": []
            }
        ]
    },

    {
        "id": 75,
        "name": "日期",
        "funcAlias": null,
        "pid": 0,
        "children": []
    },
    {
        "id": 76,
        "name": "条件限定",
        "funcAlias": null,
        "pid": 0,
        "children": [
            {
                "id": 77,
                "name": "所有",
                "funcAlias": null,
                "pid": 76,
                "children": []
            },
            {
                "id": 78,
                "name": "任意一个",
                "funcAlias": null,
                "pid": 76,
                "children": []
            },
            {
                "id": 79,
                "name": "存在",
                "funcAlias": null,
                "pid": 76,
                "children": []
            }
        ]
    },
    {
        "name": "起始符",
    },
    {
        "name": "终结符",
    },
]
export default data;