// 1. First Lesson - Types & values (Learning Generics)

type Expect<T extends boolean> = T extends true ? true : false;
type Equal<A, B> = Expect<A extends B ? B extends A ? true : false : false>;

// Challenges
// 1. - The `identity` function takes a value of any type and returns it. Make it generic!
namespace genericFunction {
  function identity<T>(a: T): T { // T is a generic type now
    return a;
  }

  let input1 = 10;
  let res1 = identity(input1);

  type test1 = Expect<Equal<typeof res1, number>>;

  let input2 = "Hello";
  let res2 = identity(input2);
  
  type test2 = Expect<Equal<typeof res2, string>>;
}

// 2. - `safeHead` takes an array, a default value and returns the first element of the array if it isn't empty. Make it generic!
namespace safeHead {
  function safeHead<T>(array: T[], defaultValue: T): T {
    return array[0] ?? defaultValue;
  }

  let input1 = [1, 2, 3];
  let res1 = safeHead(input1, 0);
  
  type test1 = Expect<Equal<typeof res1, number>>;

  let input2 = ["Hello", "Hola", "Bonjour"];
  let res2 = safeHead(input2, "Hi");
  
  type test2 = Expect<Equal<typeof res2, string>>;
}

// 3. `map` transforms all values in an array to a value of different type. Make it generic!
namespace map {
  function map<A, B>(array: A[], fn: (value: A) => B): B[] {
    return array.map(fn);
  }

  let input1 = [1, 2, 3];
  let res1 = map(input1, value => value.toString());
  
  type test1 = Expect<Equal<typeof res1, string[]>>;

  let input2 = ["Hello", "Hola", "Bonjour"];
  let res2 = map(input2, str => str.length);
  
  type test2 = Expect<Equal<typeof res2, number[]>>;
}

// 4. `pipe2` takes a value and pipes it into 2 functions sequentially. For example, `pipe2(x, f1, f2)` will result in `f2(f1(x))`. Make it generic!
namespace pipe2 {
  function pipe2<A, B, C>(
    x: A,
    f1: (value: A) => B,
    f2: (value: B) => C 
  ): C {
    return f2(f1(x));
  }

  let res1 = pipe2(
    [1, 2, 3],
    arr => arr.length,
    length => `length: ${length}`
  );

  type test1 = Expect<Equal<typeof res1, string>>;

  let res2 = pipe2(
    { name: 'Alice' },
    user => user.name,
    name => name.length > 5
  );
  
  type test2 = Expect<Equal<typeof res2, boolean>>;
}
