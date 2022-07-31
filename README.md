# Hyper Service Transfer Protocol on EVM

The protocol aims to develop a contract level abstraction for the Hyper Service Transfer Protocol.

The protocol will implement way to transfer services between two parties.
One contract could call another contract within the same chain.

Thus the contracts can call each other freely, they can check their system status, and they can communicate with each other.

### Awesome web3 services running top of HSTP

[Full list here](https://github.com/cagataycali/awesome-web3-services)


### Hello world

[You can test the HSTP and try on remix now.](https://gist.github.com/cagataycali/947039f7c8d066957b3652b638085f49)

### How to use the protocol

The protocol itself is a [smart contract proposal](./HSTP.sol), you can set your Contract as HSTP contract.

HSTP is a abstract class.

- One HSTP node is a router and a service.

```solidity
// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "hstp/HSTP.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Todo is HSTP("Todo") {

    struct TodoRequest {
        string todo;
    }
    
    function addTodo(TodoRequest memory request) public payable returns(Response memory response) {
        response.body = request.todo;
        return response;
    }

    // Override for HSTP.
    function query(bytes memory payload)
        public
        view
        virtual
        override
        returns (Response memory) {}

    function mutation(bytes memory payload)
        public
        payable
        virtual
        override
        returns (Response memory) {
            (TodoRequest memory todoRequest) = abi.decode(payload, (TodoRequest));
            return this.addTodo(todoRequest);
        }
}
```

### Contribute:

#### Developer level contribution

- [ ] Write a todo application with HSTP, deploy with remix and test it.
- [ ] Draw example architecture of HSTP (serviceless architecture).

#### Core level contribution

**Todo:**

- [ ] ETA: 1 week - Implement TCP server uses libp2p. That resolves problem of cross network communication. (web2 -> web3 || web3 -> web3 || web3 -> web2 || web2 -> web2)
    - libp2p need to fetch the target resolver from registry (EVM-based blockchain).
- [ ] ETA: 5 days - Implement HTTP server resolves HSTP interface (/GET query, /POST mutation)

**Done:**

- [x] Implement HTTP client resolves HSTP interface (/GET query, /POST mutation)
    - [x] fetch('hstp://flex.link/service/query') // This is supported now.
- [x] Implement HSTP protocol for EVM-based blockchains.
    - [x] HSTP protocol is available for EVM-based blockchains now.
### Inspirations:

- [x] Solidity level abstraction for Hyper Service Transfer Protocol ([diamond protocol eip-2535](https://eips.ethereum.org/EIPS/eip-2535))
- [x] TCP level abstraction for Hyper Service Transfer Protocol ([libp2p](https://libp2p.io/))

# License

GNU GENERAL PUBLIC LICENSE V3

# Author

[Cagatay Cali](https://twitter.com/cagataycali)
