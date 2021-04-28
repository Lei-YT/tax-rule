import Mock from 'mockjs'

const Random = Mock.Random

Mock.mock('/api/login','post', (req, res) => {
    return Mock.mock({
        'user': Random.cname(),
        'token':Random.string('lower', 35)
    })
})

Mock.mock('/api/logout','post', (req, res) => {
    return Mock.mock({
        'code': 200,
        'msg':'退出成功'
    })
})

// 使用mockjs模拟数据
let userList = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|20': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id': '@string("lower",32, 32)',
    'name': '@cname',
    'age': '@string("number", 2)',
    'sex': '男',
    'phone': '@string("number", 11)',
    'email': '@email',
    'address': '@county(true)',
    'icon': Random.image('200x200', '#4A7BF7', 'icon'),
    'creatTime': Random.datetime()
  }]
})
//根据数据模板生成模拟数据
Mock.mock('/api/getUsers', 'get', (req, res) => {
  // console.log(res)
  return {
    status: 0,
    data: userList,
    message: '成功'
  }
})


Mock.mock('/api/getAudit', 'get', (req, res) => {
  // console.log(res)
  return {
    status: 0,
    data: Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|20': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id': '@string("lower",32, 32)',
        'code': /\d{6,6}/,
        'projectName': '@ctitle(3, 5)',
        'msg': '@ctitle(3, 5)',
        'phone': '@string("number", 11)',
        'email': '@email',
        'address': '@county(true)',
        'icon': Random.image('200x200', '#4A7BF7', 'icon'),
        'creatTime': Random.datetime()
      }]
    }),
    message: '成功'
  }
})


