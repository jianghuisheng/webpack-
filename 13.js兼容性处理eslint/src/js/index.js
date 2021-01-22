// const add = function add(x, y) {
//   return x + y;
// };
// eslint-disable-next-line
// console.log(add(2, 5));
// 直接引入
import '@babel/polyfill'; // import 'core-js/stable'
// import 'regenerator-runtime'

const add = function add(x, y) {
  return x + y;
};

add(2, 5);
const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了~');
    resolve();
  }, 1000);
});
console.log(promise);
