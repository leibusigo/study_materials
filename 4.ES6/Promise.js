// 1.引入fs模块
const fs = require('fs');

// // 2.调用方法读取文件
// // 参数：文件 回调函数（抛出错误，读取结果 Buffer）
// fs.readFile('为学.md', (err, data) => {
//     // 如果失败，抛出错误
//     if (err) throw err;
//     // 如果没有出错，则输出内容
//     console.log(data.toString());
// })

// 3.使用Promise封装
const p = new Promise(function (resolve, reject) {
    fs.readFile('为学.md', (err, data) => {
        // 判断如果失败,reject使p=false，并且可设置失败的值。
        if (err) reject(err);
        // 如果成功
        resolve(data);
    })
})

p.then(function (value) {
    console.log(value.toString());
}, function (reason) {
    console, length("读取失败！");
});