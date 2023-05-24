import { ptr } from "bun:ffi";
import { symbols } from "./ffi";
import { encode, toSting } from "./encoder";

abstract class Moeban<T> {
  private db_name: string;
  protected abstract collectionName: string;
  constructor(filename: string) {
    this.db_name = filename;
    this.createDb(this.db_name);
  }
  //@ts-ignore
  private async createDb(filename: string): Promise<string> {
    let result = Promise.resolve(symbols.createDb(ptr(encode(filename))));
    if (await result) return `The data base ${filename} was created`;
  }
}

export { Moeban };
