import { ptr } from "bun:ffi";
import { symbols } from "../ffi/wrapper";
import { encode, toString } from "../ffi/helpers";

class Moeban {
    private db_name: string;
    protected modelName: string;

    constructor(fileName: string, modelName: string) {
        this.db_name = fileName;
        this.modelName = modelName;
        this.createDb(this.db_name);
    }

    //@ts-ignore
    private async createDb(filename: string): Promise<string> {
        let result = Promise.resolve(symbols.createDb(ptr(encode(filename))));
        if (await result) return `The database ${filename} was created`;
        // throw new Error("Error creating the database");
    }

    public async write(object: object): Promise<string> {
        const jsonString = JSON.stringify(object);
        let result = Promise.resolve(
            symbols.write(
                ptr(encode(this.db_name)),
                ptr(encode(this.modelName)),
                ptr(encode(jsonString))
            )
        );
        if (await result) return `Updated Model`;
        throw new Error("Error updating model");
    }

    public async find(): Promise<object[] | Error> {
        const resultPtr = symbols.find(
            ptr(encode(this.db_name)),
            ptr(encode(this.modelName))
        );

        if (resultPtr === null || resultPtr === undefined) {
            throw new Error(`The model "${this.modelName}" was not found`);
        }

        const resultStr: string = toString(resultPtr);
        const resultObj = JSON.parse(resultStr);
        return Promise.resolve(resultObj);
    }

    public async findOne(
        key: string | number,
        value: string | number
    ): Promise<object | Error> {
        const resultPtr = symbols.findOne(
            ptr(encode(this.db_name)),
            ptr(encode(this.modelName)),
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
                ptr(encode(this.modelName)),
                ptr(encode(key)),
                ptr(encode(value))
            )
        );
        if (await result) return true;
        throw new Error("Could not delete object");
    }
}

export { Moeban };