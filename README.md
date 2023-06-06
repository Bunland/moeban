# moeban

Moeban JSON/NoSQL Database + ODM.

## Download

```bash
git clone https://github.com/vitalspace/moeban.git
```

## Usage

```coffeescript
import { Moeban } from "./src/lib";

interface User {
  _id: string | number;
  name: string;
  email: string;
}

// instance "UserModel" will receive as a parameter the name of the database in this case "example.json"
// and the name of the collection
const userModel = new Moeban("example.json", "users");

// Methods

const user: User = {
  _id: 1,
  name: "Luis",
  email: "luis@mail.com",
};

await userModel.write(user);
await userModel.find();
await userModel.findOne("_id", "1");
await userModel.removeOne("_id", "1");

// You can use the console to check that each of the methods return in this way.

console.log(await userModel.write(user));
console.log(await userModel.find())
console.log(await userModel.findOne("_id", "3"));
console.log(await userModel.removeOne("_id", "2"));


// You can also handle errors with try catch blocks.

try {
  console.log(await userModel.write(user));
} catch (error) {
  console.error("Error in write:", error);
}

try {
  console.log(await userModel.find());
} catch (error) {
  console.error("Error in find:", error);
}

try {
  console.log(await userModel.findOne("_id", "3"));
} catch (error) {
  console.error("Error in findOne:", error);
}

try {
  console.log(await userModel.removeOne("_id", "2"));
} catch (error) {
  console.error("Error in removeOne:", error);
}

// You can also use promises.

userModel.write(user)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error in write:", error);
  });

userModel.find()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error in find:", error);
  });

userModel.findOne("_id", "3")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error in findOne:", error);
  });

userModel.removeOne("_id", "2")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error in removeOne:", error);
  });

```

## Testing lib

```bash
bun test
```

```coffeescript
bun test v0.6.5 (052df7d4)

index.test.ts:
✓ Test write function > Should write a model [4.37ms]
✓ Test find function > Should return an array of objects [1.16ms]
✓ Test findOne function > Should return an object [0.42ms]
✓ Test removeOne function > Should return true if the element was removed [0.59ms]
✓ Test findOne function > Should throw an error when the element could not be found [0.80ms]
✓ Test removeOne function > Should throw an error when the element could not be deleted [0.23ms]

 6 pass
 0 fail
 8 expect() calls
Ran 6 tests across 1 files. 6 total [24.00ms]
```
