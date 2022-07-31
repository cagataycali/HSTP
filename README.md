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

- One HSTP node is a router and a service.

```solidity
// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "https://github.com/cagataycali/HSTP/blob/main/HSTP.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Todo is HSTP("Todo") {
    function addTodo(string[] memory request) public payable returns(Response memory response) {
        response.body = request[0];
        return response;
    }

    // Override for HSTP.
    function query(string[] memory request)
        public
        view
        virtual
        override
        returns (Response memory) {}

    function mutation(string[] memory request)
        public
        payable
        virtual
        override
        returns (Response memory) {
            return this.addTodo(request);
        }
}
```

### Test the HSTP:

- [x] Query the service: `request: ["payload"], response: ["status", "body"]`
- [x] Mutation the service: `request: ["payload"], response: ["status", "body"]`


### Contribute:

- [ ] Write a todo application with HSTP, deploy with remix and test it.
- [ ] Draw example architecture of HSTP (serviceless architecture).
- [ ] Write a paywall on top of https://flex.link so the router could be payable.

# License

GNU GENERAL PUBLIC LICENSE V3

# Author

[Cagatay Cali](https://twitter.com/cagataycali)
