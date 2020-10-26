//TODO Support Step = 0;
//TODO Error Handling
//TODO width 0 handle error
//TODO support infinite iterables as input
//TODO step >= width
//TODO step < width

function isIterable(iterable){
  return (iterable && typeof iterable[Symbol.iterator] === 'function')
}

function isNumber(number){
  return (typeof number === 'number' && Number.isFinite(number) && !Number.isNaN(number) && Number.isSafeInteger(number))
}


function* iterWindow(iterable, width, fill = null, step = 1) {
  //? fill can be anything, even object

  if(!isIterable(iterable)){
    throw new TypeError(`Expected an iterable, instead got ${iterable}, Symbol.iterator property missing or is not a function`)
  }

  if(!isNumber(width)){
    throw new TypeError(`Expected number instead got ${width} of type ${typeof width}`)
  }

  if(!isNumber(step)){
    throw new TypeError(`Expected number instead got ${step} of type ${typeof step}`)
  }

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

export { iterWindow };
