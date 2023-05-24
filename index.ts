import { Moeban } from "./src/lib";

interface User {
  _id: string;
  name: string;
  email: string;
}

class UserModel extends Moeban<User> {
  protected collectionName = "users";
}

const userModel = new UserModel("example.json");
