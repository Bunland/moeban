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
  _id: 5,
  name: "Luis",
  email: "luis@mail.com",
};

// console.log(await userModel.write(JSON.stringify(user)));
console.log(await userModel.find())
// console.log(await userModel.findOne("_id", "2"));
// console.log(await userModel.removeOne("_id", "2"));
