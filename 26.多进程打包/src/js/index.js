import '../css/index.css';
// import '@babel/polyfill';

import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c);
}

// eslint-disable-next-line
console.log(mul(2, 3))

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4))

/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
    "env": {
      "browser": true // 支持浏览器端全局变量
    }
  2. sw代码必须运行在服务器上
    --> node.js
    --> npm i serve -g
        serve -s build 启动服务器，将build目录下所有资源作为静态
*/
// 注册 serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功');
      })
      .catch(() => {
        console.log('sw注册失败');
      });
  });
}
