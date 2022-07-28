# Hyper Service Transfer Protocol on EVM

The protocol aims to develop a contract level abstraction for the Hyper Service Transfer Protocol.

The protocol will implement way to transfer services between two parties.
One contract could call another contract within the same chain.

Thus the contracts can call each other freely, they can check their system status, and they can communicate with each other.

### How to use the protocol

The protocol itself is a smart contract proposal, you can set your Contract as HSTP contract.


HSTP is a abstract class.

Implements: HTTP methods, HTTP headers, HTTP body, HTTP status code, HTTP status message, HTTP version.

```solidity
contract Todo is HSTP {
    function head() {

    }
    function get(string calldata path, string[] calldata params) {
        if (path === '/') {
            return this.todos;
        } else if (path.includes('/todo/')) {
            return this.todos[path.split('/todo/')[1]];
        } else {
            return this.404();
        }
    }
    function post() {

    }
    function put() {

    }
    # Implemented by default
    function 404() {
        return "404"
    }
}
```

# License
GNU GENERAL PUBLIC LICENSE V3

# Author
[Cagatay Cali](https://twitter.com/cagataycali)