// This is your HSTP Node, running on browsers who see the page.

// You can use this to send messages to another the HSTP Node.
// You can also use this to receive messages from another HSTP Node.

// You can also use this to send messages to the HTTP Server.
// You can also use this to receive messages from the HTTP Server.
const Operation = {
    Query: 0,
    Mutation: 1
}
class Router {
    web3 = null;
    contract = null;
    isConnected = false;
    routes = {};
    name = null;
    userAddress = null;
    constructor(superNode, routerAddress, userAddress) {
        // Connect web3 network.
        this.connect(superNode, routerAddress);
        // Set the owner user address.
        this.userAddress = userAddress;
    }
    query(name, data) {
        return this.routes[name].query(data);
    }
    mutation(name, data) {
        return this.routes[name].mutation(data);
    }
    reply(name, operation, payload) {
        if (this.routes[name]) {
            if (operation == Operation.Query) {
                // Returns promise.
                return this.contract.methods.query(payload).call();
            } else if (_operation == Operation.Mutation) {
                return this.contract.methods.mutation(payload).send({from: this.userAddress, to: this.contract._address});
            }
        }
        return super.reply(name, _operation, payload);
    }
    // Node is HSTP class instance.
    register(name, node) {
        this.routes[name] = node;
    }
    connect(superNode, routerAddress) {
        this.web3 = AlchemyWeb3.createAlchemyWeb3(
            superNode,
        );
        this.contract = new this.web3.eth.Contract(
            getHSTPContractInterfaceABI(), // it's generic. HSTP interface abi.
            routerAddress,
        );
        this.isConnected = true;
    }
}
class HSTP extends Router {
    constructor(name, superNode, routerAddress, userAddress) {
        super(superNode, routerAddress, userAddress);
        super.register(name, this);
    }
    query(payload) {}
    mutation(payload) {}
}

// Thanks hoisting.
// The HSTP interface is equal.
function getHSTPContractInterfaceABI() {
    return [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "enum Operation",
                    "name": "operation",
                    "type": "uint8"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "payload",
                    "type": "bytes"
                }
            ],
            "name": "Log",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "components": [
                        {
                            "internalType": "contract HSTP",
                            "name": "resolver",
                            "type": "address"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Router.Registry",
                    "name": "registry",
                    "type": "tuple"
                }
            ],
            "name": "Register",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "payload",
                    "type": "bytes"
                }
            ],
            "name": "mutation",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint8",
                            "name": "status",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "body",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Response",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "payload",
                    "type": "bytes"
                }
            ],
            "name": "mutation",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint8",
                            "name": "status",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "body",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Response",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "bytes",
                    "name": "payload",
                    "type": "bytes"
                }
            ],
            "name": "query",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint8",
                            "name": "status",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "body",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Response",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "payload",
                    "type": "bytes"
                }
            ],
            "name": "query",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint8",
                            "name": "status",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "body",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Response",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "contract HSTP",
                    "name": "node",
                    "type": "address"
                }
            ],
            "name": "register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "enum Operation",
                    "name": "_operation",
                    "type": "uint8"
                },
                {
                    "internalType": "bytes",
                    "name": "payload",
                    "type": "bytes"
                }
            ],
            "name": "reply",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint8",
                            "name": "status",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string",
                            "name": "body",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Response",
                    "name": "response",
                    "type": "tuple"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "routes",
            "outputs": [
                {
                    "internalType": "contract HSTP",
                    "name": "resolver",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}