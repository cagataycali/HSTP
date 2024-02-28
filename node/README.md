# HSTP - Hyper Simple Text Protocol

HSTP is a protocol for connecting AI systems. It's a simple text-based protocol that allows AI systems to communicate with each other. It's designed to be simple and easy to use.

## How it works

HSTP is text-based, text to action protocol, each message can turn into multiple actions. You can use your system instructions, tools, and AI to interact with other systems that are part of the HSTP network.

## How to use

HSTP uses OpenAI and Tiny AI to provide AI services. You need to have an OpenAI API key to use HSTP. Soon we will support Ollama, Mistral Large, and other AI services.

```bash
OPENAI_API_KEY=sk-XXXXXXXXXX npx hstp; # Start the server
```

## Prequesties

- Node.js
- OpenAI API key
- Edge AI: tiny.technology API key (optional - you can remove it from the code if you don't want to use it)

# Connect over WS

WS port is 8080, you can connect to the server using any WebSocket client.

```javascript
// npx hstp;
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function() {
  console.log("connected to the server");
};

socket.onmessage = function(message) {
  console.log("Received:", message.data);
};

socket.send("What can tiny do?");
```

# Connect over TCP

TCP port is 9000, you can connect to the server using netcat or any other TCP client.

```bash
# npx hstp;
nc localhost 9000
```

## How to override the system instructions

```bash
# Create a .hstp file in your directory
echo "I'm a helpful asssistant." > .hstp
# Start the server
npx hstp;
```

## How to add local tools & functions

```bash
# Clone the repository
git clone git@github.com:cagataycali/hstp.git;
cd hstp/node;

# Create a tools.json file in your directory
echo '{"echo": "echo"}' > tools.json # Check our tools.json for more examples

# Add your function to the functions directory
echo "module.exports = async function (input) {
  // Your code here
  return output;
};" > functions/yourFunction.js

# Modify the index.js file to include your function
echo "const yourFunction = require('./yourFunction'); module.exports = { yourFunction };" > index.js

# Start the server
npx hstp;
```

## How to use Edge AI

```bash
create an ai named "your-ai" # This will create your AI in tiny.technology network.
```

## How to add your function to the HSTP network

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

# License

MIT - see [LICENSE](./LICENSE) for details.

# Contributing

All contributions are welcome. Please open an issue or a pull request.

# Author

Cagatay Cali

