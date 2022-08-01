# Hyper Service Transfer Protocol on Computer Networks

The protocol aims to develop a application layer abstraction for the Hyper Service Transfer Protocol.

The protocol will implement way to transfer services between two parties.
One contract could call another contract within the same chain.

Thus the contracts can call each other freely, they can check their system status, and they can communicate with each other.
## How it works

The protocol is based on the Hyper Service Transfer Protocol. The protocol is a protocol for transferring services between two parties.

Means, one country can talk in X language, another one is talking in Y language. The protocol will translate the language from X to Y and Y to X. Thus both parties can talk to each other without barrier. This is a abstraction layer of communication. We have the same abstraction layer on HTTP now, called load balancers and for use case can be called proxy. The proxy can be used to transfer the HTTP request to another HTTP server.

### Awesome web services running top of HSTP

[Full list here](https://github.com/cagataycali/awesome-web3-services)


### Hello world

[You can test the HSTP and try on remix now.](https://gist.github.com/cagataycali/947039f7c8d066957b3652b638085f49)

### How to use the protocol

The protocol itself is a [smart contract proposal](./HSTP.sol), you can set your Contract as HSTP contract.

HSTP is a abstract class.

- One HSTP node is a router and a service.
- Implements [.query, .mutation, .registry].

Example solidity HSTP node:

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

- [x] Applicability of the Babel Routing Protocol https://datatracker.ietf.org/doc/rfc8965/
- [x] EIP: The Extended Internet Protocol A Framework for Maintaining Backward Compatibility - https://datatracker.ietf.org/doc/html/rfc1385
- [x] Mindset [Humanode](https://humanode.io/)
  - *Why it's not a Humanode:* They are so high level for this abstraction, yet but the correct path is HSTP.
- [x] Solidity level abstraction for Hyper Service Transfer Protocol ([Diamond protocol eip-2535](https://eips.ethereum.org/EIPS/eip-2535))
  - [x] *Why it's not a diamond:* https://blog.trailofbits.com/2020/10/30/good-idea-bad-design-how-the-diamond-standard-falls-short/
- [x] TCP level abstraction for Hyper Service Transfer Protocol ([libp2p](https://libp2p.io/))
 - [x] *Why it's not a libp2p:* There's no application representation layer. It's just a network layer.
- [x] TCP layer abstraction approach: https://datatracker.ietf.org/doc/html/rfc1347
  - [x] *Why it's not a RFC1347:* It's not a standard, it's just a proposal. Application representation layer is missing.
# License

GNU GENERAL PUBLIC LICENSE V3

# Author

[Cagatay Cali](https://twitter.com/cagataycali)
