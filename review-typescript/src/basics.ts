// Primitives: number, string, boolean, null, undefined,
// More complex types: arrays, objects,
// Function types, parameters

// Primitives
let age: number = 100;

let userName: string = 'talker';

let isTalker = true;

// More complex types

let hobbies: string[] = ['talking', 'walking'];

let person: { name: string, age: number } = { name: "talker", age: 100 };

let people: { name: string, age: number }[] = [{ name: "talker", age: 100 }];

// Type inference

let course = 'the complete guide';
// course = 123; error

// union type

let tree: string | number = 'the tree';
tree = 123121;

// type aliases

type Person = { name: string, age: number };

let p: Person;
let ps: Person[];

// Functions & types

function add(a: number, b: number): number {
  return a + b;
}

function printValue(value: any): void {
  console.log(value);
}

// Generics

function insertAtBeginning(array: any[], value: any) {
  const newArray = [value, ...array];
  return newArray;
}

function insertAtBeginningGenerics<T>(array: T[], value: T): T[] {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
// const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]

const updatedArray = insertAtBeginningGenerics(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginningGenerics(['a', 'b'], 'c');

// Class

class Student {
  firstName: string;
  lastName: string;
  age: number;
  private courses: string[];

  constructor(firstName: string, lastName: string, age: number, courses: string[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.courses = courses;
  }

  enroll(course: string) {
    this.courses.push(course);
  }

  listCourses() {
    return this.courses.slice();
  }
}

const student = new Student('talker', 'walker', 100, ['Angular']);
student.enroll('React');
student.listCourses();

class Component {

  // short hand notation
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    private courses: string[]) {
  }

  enroll(course: string) {
    this.courses.push(course);
  }

  listCourses() {
    return this.courses.slice();
  }
}

// interface

interface Human {
  name: string;
  age: number;
  greet: () => void;
}

let runner: Human = {
  name: 'runner',
  age: 120,
  greet() {
    console.log('hello');
  },
};

class Instructor implements Human {
  name: string = 'runner';
  age: number = 120;

  greet() {
    console.log('hello');
  }
}
