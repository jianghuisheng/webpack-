function sum(...args) {
  return args.reduce((p, c) => p + c);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4))