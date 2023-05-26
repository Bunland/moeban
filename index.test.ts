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
  test("Shoult retun an array object", async () => {
    const result = await userModel.find();
    expect(Array.isArray(result)).toBe(true);
  });
});
