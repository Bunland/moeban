import { Moeban } from "./src/lib";

interface User {
  _id: string | number;
  name: string;
  email: string;
}
const userModel = new Moeban("example.json", "users");

const user: User = {
  _id: 1,
  name: "Luis",
  email: "luis@mail.com",
};

await userModel.write(user);
await userModel.find();
await userModel.findOne("_id", "1");
await userModel.removeOne("_id", "1");
