import { describe, expect, test } from "bun:test";
import { Moeban } from "../src/database/service";

interface User {
    _id: string | number;
    name: string;
    email: string;
}

const userModel = new Moeban("db_test.json", "users");

const user: User = {
    _id: 1,
    name: "Lucas",
    email: "Lucas@mail.com",
};

describe("Test write function", () => {
    test("Should write a model", async () => {
        expect(await userModel.write(user)).toBe("Updated Model");
    });
});

describe("Test find function", () => {
    test("Should return an array of objects", async () => {
        const result = await userModel.find();
        expect(Array.isArray(result)).toBe(true);
    });
});

describe("Test findOne function", () => {
    test("Should return an object", async () => {
        const result = await userModel.findOne("_id", "1");
        expect(typeof result).toBe("object");
    });
});

describe("Test removeOne function", () => {
    test("Should return true if the element was removed", async () => {
        expect(await userModel.removeOne("_id", "1")).toBe(true);
    });
});

describe("Test findOne function", () => {
    test("Should throw an error when the element could not be found", async () => {
        let error;
        try {
            await userModel.findOne("_id", "123123");
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
        //@ts-ignore
        expect(error.message).toBe("The object was not found");
    });
});

describe("Test removeOne function", () => {
    test("Should throw an error when the element could not be deleted", async () => {
        let error;
        try {
            await userModel.removeOne("_id", "2312");
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
        //@ts-ignore
        expect(error.message).toBe("Could not delete object");
    });
});