import { ptr } from "bun:ffi";
import { symbols } from "./ffi";
import { encode, toString } from "./encoder";

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

  public async write(object: string): Promise<string> {
    let result = Promise.resolve(
      symbols.write(
        ptr(encode(this.db_name)),
        ptr(encode(this.collectionName)),
        ptr(encode(object))
      )
    );
    if (await result) return `Updated Model`;
    // if (await result) return `Updated Model ${this.collectionName}`;
    throw new Error("Error updating model");
  }

  public async find(): Promise<object[]> {

    const resultPtr = symbols.find(
      ptr(encode(this.db_name)),
      ptr(encode(this.collectionName))
    );


    if (resultPtr.toString() === "err1") {
      throw new Error(`The collection ${this.collectionName} was not found`);
      // return;
    } else  if (resultPtr.toString() === "err2") {
      throw new Error(`The ${this.db_name} Database was not found.`);
      // return;
    } else {

      
    const resultStr: string = toString(resultPtr);
      console.log(resultStr)
    const resultObj = JSON.parse(resultStr);
    return Promise.resolve(resultObj);
    // return "lol"
    }
    
  
    // return Promise.resolve(
    //   JSON.parse(
    //     toString(
    //       symbols.find(
    //         ptr(encode(this.db_name)),
    //         ptr(encode(this.collectionName))
    //       )
    //     )
    //   )
    // );

    // const resultPtr = symbols.find(
    //   ptr(encode(this.db_name)),
    //   ptr(encode(this.collectionName))
    // );

    // if (resultPtr == "err1") {
    //   // throw new Error(`The collection ${this.collectionName} was not found`);
    //   return;
    // }

    // if (resultPtr == "err2") {
    //   // throw new Error(`The ${this.db_name} Database was not found.`);
    //   return;
    // }

    // const resultStr: string = toString(resultPtr);
    // const resultObj = JSON.parse(resultStr);
    // return Promise.resolve(resultObj);
  }

  public async findOne(
    key: string | number,
    value: string | number
  ): Promise<object | Error> {
    const resultPtr = symbols.findOne(
      ptr(encode(this.db_name)),
      ptr(encode(this.collectionName)),
      ptr(encode(key)),
      ptr(encode(value))
    );
    if (resultPtr === null || resultPtr === undefined) {
      throw new Error("The object was not found");
    }
    const resultStr: string = toString(resultPtr);
    const resultObj = JSON.parse(resultStr);
    return Promise.resolve(resultObj);
  }

  public async removeOne(
    key: string | number,
    value: string | number
  ): Promise<boolean> {
    let result = Promise.resolve(
      symbols.removeOne(
        ptr(encode(this.db_name)),
        ptr(encode(this.collectionName)),
        ptr(encode(key)),
        ptr(encode(value))
      )
    );
    if (await result) return true;
    throw new Error("Could not delete object");
  }
}

export { Moeban };
