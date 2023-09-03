import { Moeban } from "./database/service";

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