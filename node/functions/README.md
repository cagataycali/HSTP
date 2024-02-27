# Local Functions

Extend the hstp by adding your own functions.

# Best Practices

- Function name should be unique and descriptive and file name should be same as function name. Each function should be in its own file.
- Function should be stateless and should not rely on any external state.
- Function should be idempotent, meaning that it should produce the same result every time it is called with the same input.
- Function should be pure, meaning that it should not have any side effects.
- Function should be fast, meaning that it should produce a result in a reasonable amount of time.

# How to use

```javascript
module.exports = async function (input) {
  // Your code here
  return output;
};
```

# How to add your function to the HSTP network

```javascript
// index.js
const yourFunction = require('./yourFunction');

module.exports = {
  // Other functions
  // ..., 
  yourFunction
};
```

That's it! Your function is now part of the HSTP network. You can now use it to interact with other systems that are part of the HSTP network.