export class Stack<T> {
  private array: T[] = [];

  get length() {
    return this.array.length;
  }

  push = (value: T): void => {
    this.array.push(value);
  };

  pop = (): T => this.array.pop();

  pop2 = (): [T, T] => {
    const second = this.array.pop();
    const first = this.array.pop();
    return [first, second];
  };
}
