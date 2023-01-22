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

    let result = func(...args)
    hash.payload = result;
    cashe.push(hash);
    return `Вычисляем: ${result}`
  }
}

//Задача № 2
// function debounceDecoratorNew(func, delay) {
//   function wrapper(...args) {
//     wrapper.counter++;
//     return func(...args);
//   };
//   wrapper.counter = 0;
//   if (wrapper.counter === 0) {
//     return wrapper
//   } else {
//     setTimeout(wrapper, delay);
//   }
// }


// function sum(a, b) {
//   return a + b;
// }

// const test = debounceDecoratorNew(sum, 1500)
// console.log(test.counter);
// console.log(test(5, 5));
// console.log(test.counter)
// console.log(test(12,12))
// console.log(test.counter);
// console.log(test(3,2))
// console.log(test.counter)

function debounceDecoratorNew(func, delay) {
  let timeoutId = null
  
  function wrapper(...args) {
    
    if(wrapper.allCount === 0) {
      wrapper.allCount++;
      return func(...args)
    }

    if (timeoutId) {
      console.log('deleting timeOut')
      clearTimeout(timeoutId)
    }
    console.log('creating new timeout')
    timeoutId = setTimeout(() => {
      wrapper.count++;
      timeoutId = null;
      console.log(func.apply(this, args));
      console.log('calling timeOut');
    }, delay)
    wrapper.allCount++;
  }
  wrapper.count = 0;
  wrapper.allCount = 0;
  return wrapper
}

function sum(a, b) {
  return a + b;
}

const test = debounceDecoratorNew(sum, 2000)
console.log(test(5, 5));
console.log(test(5, 5));
console.log(test(5, 5));
console.log(test(1, 5));

setTimeout(() => test(3, 3), 2500)

console.log(test.count, '  <<< this is COUNT!!!');
