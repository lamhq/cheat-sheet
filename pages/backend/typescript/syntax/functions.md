# Functions

## Function Type

```ts
type GreetFunction = (a: string) => void;

function greeter(fn: GreetFunction) {
  fn("Hello, World");
}
```


## Call Signatures

A call signature in TypeScript defines the parameters and return type of a function within an object type.

It allows you to create objects that can be invoked like functions but also have properties.

```ts
type MyCallableObject = {
  (input: string): string; // Call signature
  description: string;     // Property
};

const myObject: MyCallableObject = (input: string) => {
  return `Hello, ${input}!`;
};

myObject.description = "Greeting Function";

console.log(myObject("World")); // Output: Hello, World!
console.log(myObject.description); // Output: Greeting Function
```


## Construct Signatures

Construct signatures define the shape of a constructor function, specifying the parameters it expects and the type of object it constructs.

They use the `new` keyword in a type declaration to ensure the correct instantiation of classes or objects.

```ts
type SomeConstructor = {
  new (s: string): SomeObject;
};

function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```


## Generic Functions

In TypeScript, **generics** are used when we want to describe a correspondence between two values.

Note that the type was inferred (chosen automatically) by TypeScript, but not always.

```ts
function firstElement<Type>(arr: Type[]): Type {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
```

### Constraints

Sometimes we want to only operate on a certain subset of values, we can use a constraint to limit the kinds of types that a type parameter can accept.

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'string'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
```

Common error when working with generic constraints:

```ts
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
    /*
      Type '{ length: number; }' is not assignable to type 'Type'.
      '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.
    */
  }
}
```

The problem is that the function promises to return the same kind of object as was passed in (the `Type` in type parameter), not just some object matching the constraint.

### Guidelines for Writing Good Generic Functions

**1. Push Type Parameters Down**:

```ts
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

2. Use Fewer Type Parameters
3. Type Parameters Should Appear Twice 


## Optional Parameters

```ts
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
```

```ts
function f(x = 10) {
  // ...
}
```

### Optional Parameters in Callbacks

In JavaScript, if you call a function with more arguments than there are parameters, the extra arguments are simply ignored.

**When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument.**

Read more about that [here](https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters-in-callbacks).


## Function Overloads

Some JavaScript functions can be called in a variety of argument counts and types.

In TypeScript, we can specify a function that can be called in different ways by writing overload signatures.

To do this, write some number of function signatures (**overload signature**). Then, we wrote a function implementation with a compatible signature (**implementation signature** can't be called directly).

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
```

## Declaring `this` in a Function

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

## Other Types to Know About

### `void`

`void` represents the return value of functions which don't return a value

In JavaScript, a function that doesn't return any value will implicitly return the value `undefined`. However, `void` and `undefined` are not the same thing in TypeScript. 


### `object`

`object` refers to any value that isn't a primitive (`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, or `undefined`).

This is different from the empty object type `{ }`, and also different from the global type `Object` (it's very likely you will never use `Object`).

`object` is not `Object`. Always use `object`!

### `unknown`

The unknown type represents any value. This is similar to the `any` type, but you cannot perform any operations on an `unknown` value without first checking its type.

*For example, if you have a variable of type unknown, you cannot call any methods or properties on it without first checking its type*

```ts
function foo(bar: unknown) {
  if (typeof bar === 'string') {
    console.log(bar.toUpperCase());
  }
}
```

### `never`

Some functions never return a value. This means that the function throws an exception or terminates execution of the program.:

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

`never` also appears when TypeScript determines there's nothing left in a union:

```ts
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```

### `Function`

This is an untyped function call and is generally best avoided because of the unsafe `any` return type.

```ts
function doSomething(f: Function) {
  f(1, 2, 3);
}
```

If you need to accept an arbitrary function but don't intend to call it, the type `() => void` is generally safer.


## Rest Parameters

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

## Rest Arguments

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

## Parameter Destructuring

```ts
type ABC = { a: number; b: number; c: number };

function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```
