// import add from './add';
// import count from './count';

console.log('index.js加载了~')
// console.log(add(1,2));
// console.log(count(3,2));

import count from './count'
import('./add').then(({ default: add }) => {
  console.log(add(1, 2))
})
console.log(count(3,2));

