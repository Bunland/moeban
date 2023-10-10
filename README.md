<p align="center" width="100%">
  <img src="[./icon/icon128.png](https://github.com/Bunland/moeban/assets/29004070/372ced48-4be8-48c3-885e-e690916a7129)" alt="moeban" />
</p>

# Moeban

Moeban is a JSON/NoSQL Database + ODM (Object-Document Mapper) library for
Node.js.

## Installation

You can install Moeban using npm:

```bash
bun install @bunland/moeban
```

## Getting Started

Here's a basic example of how to use Moeban:

```javascript
const { Moeban } = require("@bunland/moeban");

// Define your data model
const userModel = new Moeban("example.json", "users");

// Create a user object
const user = {
  _id: 1,
  name: "Luis",
  email: "luis@mail.com",
};

// Write the user object to the database
userModel.write(user)
  .then((result) => {
    console.log(result); // Should return the written user object
  })
  .catch((error) => {
    console.error("Error in write:", error);
  });

// Find all users in the database
userModel.find()
  .then((users) => {
    console.log(users); // Should return an array of user objects
  })
  .catch((error) => {
    console.error("Error in find:", error);
  });

// Find a user by _id
userModel.findOne("_id", "1")
  .then((user) => {
    console.log(user); // Should return the user object with _id 1
  })
  .catch((error) => {
    console.error("Error in findOne:", error);
  });

// Remove a user by _id
userModel.removeOne("_id", "1")
  .then((result) => {
    console.log(result); // Should return true if the user was removed
  })
  .catch((error) => {
    console.error("Error in removeOne:", error);
  });
```

## Testing

You can run the tests for Moeban using the following command:

```bash
bun test
```

The tests cover various aspects of the library, including writing, finding, and
removing data, as well as error handling.

```javascript
bun test v0.8.1 (16b4bf34)

tests/service.test.ts:
✓ Test write function > Should write a model [0.55ms]
✓ Test find function > Should return an array of objects [0.35ms]
✓ Test findOne function > Should return an object [0.26ms]
✓ Test removeOne function > Should return true if the element was removed [0.50ms]
✓ Test findOne function > Should throw an error when the element could not be found [0.26ms]
✓ Test removeOne function > Should throw an error when the element could not be deleted [0.12ms]

 6 pass
 0 fail
 8 expect() calls
Ran 6 tests across 1 files. [22.00ms]
```

Feel free to explore Moeban and adapt it to your specific use cases. Happy
coding!
