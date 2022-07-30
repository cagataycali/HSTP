# Hyper Service Transfer Protocol on EVM

The protocol aims to develop a contract level abstraction for the Hyper Service Transfer Protocol.

The protocol will implement way to transfer services between two parties.
One contract could call another contract within the same chain.

Thus the contracts can call each other freely, they can check their system status, and they can communicate with each other.

### Awesome web3 services running top of HSTP

[Full list here](https://github.com/cagataycali/awesome-web3-services)

### How to use the protocol

The protocol itself is a [smart contract proposal](./HSTP.sol), you can set your Contract as HSTP contract.

HSTP is a abstract class.

Implements: HTTP methods, HTTP headers, HTTP body, HTTP status code, HTTP status message, HTTP version.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./HSTP.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Todo is HSTP("addTodo", Operation.Mutation) {
    function addTodo(string[] memory request) public payable returns(string[] memory) {
        return request;
    }
}
```


### Test the HSTP:


- [x] Query the service: `request: ["payload"], response: ["status", "body"]`
- [x] Mutation the service: `request: ["payload"], response: ["status", "body"]`


### Contribute:

- [ ] Fix the cross chain call reentrancy
- [ ] Come up with cool services to bridge web2 ^ web3

# License

GNU GENERAL PUBLIC LICENSE V3

# Author

[Cagatay Cali](https://twitter.com/cagataycali)
