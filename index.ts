import { Moeban } from "./src/lib";

interface User {
  _id: string | number;
  name: string;
  email: string;
}

class UserModel extends Moeban<User> {
  protected collectionName = "users";
}

const userModel = new UserModel("example.json");

const user: User = {
  _id: 1,
  name: "Luis",
  email: "luis@mail.com",
};

await userModel.write(user);
await userModel.find();
await userModel.findOne("_id", "1");
await userModel.removeOne("_id", "1");
