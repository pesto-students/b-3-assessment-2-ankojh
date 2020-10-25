//TODO Support Step = 0;
//TODO Error Handling
//TODO width 0 handle error
//TODO support infinite iterables as input
//TODO step >= width
//TODO step < width


function* iterWindow(iterable, width, fill = null, step = 1) {
  const iterator = iterable[Symbol.iterator]();
  let done = false;
  let window = []
  while (!done) {
    window = window.slice(step);
    const startIndex = 0
    const endIndex = step > width ? width : width - window.length 
    for (let i = startIndex; i < endIndex; i++) {
      const protocolObject = iterator.next();
      if (protocolObject.done) {
        if(i === 0){
          return;
        }
        window.push(fill);
        done = true;
      }
      else {
        window.push(protocolObject.value);
      }
    }
    yield window;
    if (step > width) {
      for (let j = 0; j < step - width; j++) {
        iterator.next()
      }
    }
  }
}

// 123456789
// 123
//     567
//         9!!
// console.log([...iterWindow([1, 2, 3, 4], 2, '!', 3)])
// console.log([...iterWindow([1, 2, 3, 4, 5], 3)])
// console.log([...iterWindow([1, 2, 3, 4, 5, 6, 7, 8, 9], 8, '!', 5)])

export { iterWindow };
