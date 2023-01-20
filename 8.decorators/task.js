//Задача № 1
function cachingDecoratorNew(func) {
  let cashe = []
  return function (...args) {
    const hash =
    {
      name: args.join(','),
      payload: null
    };
    const search = cashe.findIndex((el) => el.name === hash.name)
    if (search >= 0 && cashe.length <= 5) {
      return `Из кэша: ${cashe[search].payload}`
    }
    if (cashe.length > 5) {
      cashe.shift()
    }
    let result = func(...args)
    hash.payload = result;
    cashe.push(hash);
    return `Вычисляем: ${result}`
  }
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let flag = false;
  function wrapper(...args) {
    wrapper.counter++;
    return func(...args);
  };
  if(flag) {
    return;
  }
  wrapper.counter = 0;
  flag = true;
  if (!wrapper.counter) {
    return wrapper
  } else {
    setTimeout(() => {
      flag = false
    }, delay);
    return wrapper;
  }
}


function sum(a, b) {
  return a + b;
}

const test = debounceDecoratorNew(sum, 1500)
console.log(test.counter);
console.log(test(5, 5));
console.log(test.counter)
console.log(test(12,12))
console.log(test.counter);
console.log(test(3,2))
console.log(test.counter)


