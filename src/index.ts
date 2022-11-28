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

// 2. Second Lesson - Types are just data

// 1. Type the `move` function so that the `direction` parameter can only be assigned to "backward" or "forward".
namespace move {
  function move(direction: "backward" | "forward") {
    // some imaginary code that makes the thing move!
    return direction
  }

  move("backward")
  move("forward")

  // @ts-expect-error: ❌ not supported
  move("left")
  // @ts-expect-error: ❌ not supported
  move("right")
}

// 2. `pickOne` takes 2 arguments of potentially different types and return either one or the other at random. Make  generic!
namespace pickOne {
  function pickOne<A, B>(a: A, b: B): A | B {
    return Math.random() > 0.5 ? a : b;
  }

  const res1 = pickOne(true, false);
  type test1 = Expect<Equal<typeof res1, boolean>>;

  const res2 = pickOne(1, 2);
  type test2 = Expect<Equal<typeof res2, 1 | 2>>;

  const res3 = pickOne(2, "some string");
  type test3 = Expect<Equal<typeof res3, 2 | "some string">>;

  const res4 = pickOne(true, 7);
  type test4 = Expect<Equal<typeof res4, true | 7>>;
}

// 3. The `merge` function accepts an object of type `A` and an object of type `B`, and return an object with all properties of `A` and `B`. Make it generic!
namespace merge {
  function merge<A, B>(a: A, b: B): A & B {
    return { ...a, ...b };
  }

  const res1 = merge({ name: "Bob" }, { age: 42 });
  type test1 = Expect<Equal<typeof res1, { name: string } & { age: number }>>;

  const res2 = merge({ greeting: "Hello" }, {});
  type test2 = Expect<Equal<typeof res2, { greeting: string }>>;

  const res3 = merge({}, { greeting: "Hello" });
  type test3 = Expect<Equal<typeof res3, { greeting: string }>>;

  const res4 = merge({ a: 1, b: 2 }, { c: 3, d: 4 });
  type test4 = Expect<
    Equal<typeof res4, { a: number; b: number } & { c: number; d: number }>
  >;
}

// 4. Type `debounceFn` as a function with a `cancel` method on it.
namespace debouncedFn {
  let debouncedFn: (() => void) & { cancel: () => void };
  debouncedFn = Object.assign(() => {}, { cancel: () => {} });

  debouncedFn();
  debouncedFn.cancel();

  // ❌ `unknownMethod` does not exist on `debouncedFn`.
  // @ts-expect-error
  debouncedFn.unknownMethod();

  // ❌ can't assign a string to `debouncedFn`.
  // @ts-expect-error: ❌
  debouncedFn = "Hello";
}

// 5. Type the `stringify` function to take any kind of input.
namespace stringify {
  function stringify<T>(input: T) {
    return input instanceof Symbol ? input.toString() : `${input}`;
  }

  stringify("a string");    // ✅
  stringify(12);            // ✅
  stringify(true);          // ✅
  stringify(Symbol("cat")); // ✅
  stringify(20000n);        // ✅
}

// 6. Type the `exhaustive` function so that it cannot be called except in unreachable code branches.
namespace exhaustive {
  function exhaustive(...args: never) {}

  const HOURS_PER_DAY = 24
  // Since `HOURS_PER_DAY` is a `const`, the next condition can never happen
  if (HOURS_PER_DAY !== 24) exhaustive(HOURS_PER_DAY);

  // Outside of the condition, this should return a type error.
  // @ts-expect-error ❌
  exhaustive(HOURS_PER_DAY);

  const exhautiveCheck = (input: 1 | 2) => {
    switch (input) {
      case 1: return "!";
      case 2: return "!!";
      // Since all cases are handled, the default branch is unreachable.
      default: exhaustive(input);
    }
  }

  const nonExhautiveCheck = (input: 1 | 2) => {
    switch (input) {
      case 1: return "!";
      // the case where input === 2 isn't handled, so `exhaustive` shouldn't be called.
      // @ts-expect-error ❌
      default: exhaustive(input);
    }
  }
}

// 3. Third Lesson - Objects and Records

// 1. implement a generic to get the union of all keys of an object type.
namespace keys {
  type Keys<Obj> = keyof Obj;

  type res1 = Keys<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, "a" | "b">>;

  type res2 = Keys<{ a: number; b: string; c: unknown }>;
  type test2 = Expect<Equal<res2, "a" | "b" | "c">>;

  type res3 = Keys<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = Keys<{ [k in string]: boolean }>;
  type test4 = Expect<Equal<res4, string>>;
}

// 2. implement a generic to get the union of all values in an object type.
namespace valueof {
  type ValueOf<Obj> = Obj[keyof Obj];

  type res1 = ValueOf<{ a: number; b: string }>;
  type test1 = Expect<Equal<res1, number | string>>;

  type res2 = ValueOf<{ a: number; b: string; c: boolean }>;
  type test2 = Expect<Equal<res2, number | string | boolean>>;

  type res3 = ValueOf<{}>;
  type test3 = Expect<Equal<res3, never>>;

  type res4 = ValueOf<{ [k in string]: boolean }>;
  type test4 = Expect<Equal<res4, boolean>>;
}

// 3. Create a generic that removes the `id` key from an object type.
namespace removeId {
  type RemoveId<Obj> = Omit<Obj, "id">;

  type res1 = RemoveId<{
    id: number;
    name: string;
    age: unknown;
  }>;

  type test1 = Expect<
    Equal<res1, { name: string; age: unknown }>
  >;

  type res2 = RemoveId<{
    id: number;
    title: string;
    content: string;
  }>;

  type test2 = Expect<
    Equal<res2, { title: string; content: string }>
  >;
}

// 4. Combine Partial, Omit and Pick to create a generic that makes the `id` key of an object type optional.
namespace optionalId {
  // This is called a type constraint. We'll learn more about them soon.
  type MakeIdOptional<Obj extends { id: unknown }> =
    Partial<Pick<Obj, "id">> & Omit<Obj, "id">

  type res1 = MakeIdOptional<{
    id: number;
    name: string;
    age: unknown;
  }>;

  type test1 = Expect<
    Equal<res1, { id?: number } & { name: string; age: unknown }>
  >;

  type res2 = MakeIdOptional<{
    id: string;
    title: string;
    content: string;
  }>;

  type test2 = Expect<
    Equal<res2, { id?: string } & { title: string; content: string }>
  >;
}

// 5. Since intersections are applied recursively, how would you write an `Assign<A, B>` type-level function that matches the behavior of `{...a, ...b}`, and overrides properties of `A` with properties of `B`?
namespace assign {
  type Assign<A, B> = Omit<A, keyof B> & B;

  const assign = <A, B>(obj1: A, obj2: B): Assign<A, B> => ({
    ...obj1,
    ...obj2,
  });

  // Override `id`
  type res1 = Assign<{ name: string; id: number }, { id: string }>;
  type test1 = Expect<Equal<res1, { name: string } & { id: string }>>;

  // Override `age` and `role`
  type res2 = Assign<
    { name: string; age: string; role: string },
    { age: 42; role: "admin" }
  >;
  type test2 = Expect<
    Equal<res2, { name: string } & { age: 42; role: "admin" }>
  >;

  // No overlap
  type res3 = Assign<{ name: string; id: number }, { age: number }>;
  type test3 = Expect<
    Equal<res3, { name: string; id: number } & { age: number }>
  >;

  // Using type inference from values
  const res4 = assign({ name: "Bob", id: 4 }, { id: "3" });
  type test4 = Expect<Equal<typeof res4, { name: string } & { id: string }>>;
}
