// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
        name: {
            first: '@cname',
            middle: '@FIRST',
            last: '@LAST',
            full: '@first @middle @last'
        }
    })
// 输出结果
console.log(JSON.stringify(data, null, 4))