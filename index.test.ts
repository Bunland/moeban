//@ts-ignore
import { describe, expect, test } from "bun:test";
import { Moeban } from "./src/lib";

interface User {
  _id: string | number;
  name: string;
  email: string;
}

class UserModel extends Moeban<User> {
  protected collectionName = "users";
}

const userModel = new UserModel("db_test.json");

const user: User = {
  _id: 4,
  name: "Lucas",
  email: "Lucas@mail.com",
};

describe("Test write function", () => {
  test("Should write a model", async () => {
    expect(await userModel.write(JSON.stringify(user))).toBe("Updated Model");
  });
});

describe("Test find function", () => {
  test("Shoult return an array object", async () => {
    const result = await userModel.find();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Test findOne function", () => {
  test("Should return and object", async () => {
    const result = await userModel.findOne("_id", "1");
    expect(typeof result).toBe("object");
  });
});

describe("Test removeOne function", () => {
  test("Should return true if the element was removed", async () => {
    expect(await userModel.removeOne("_id", "4")).toBe(true);
  });
});
