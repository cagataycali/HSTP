# Hyper Service Transfer Protocol on Networks

<p align="center">
  <img src="https://github.com/cagataycali/HSTP/blob/main/assets/HSTP-center.jpg?raw=true" alt="HSTP - Hyper Service Transfer Protocol on Computer Networks"/>
</p>

The protocol aims to develop a application layer abstraction for the Hyper Service Transfer Protocol.
> HSTP is a recursion as nature of HSTP. This protocol implements itself as a interface. On every internet connected device, there is a HSTP instance. That's why the adoption is not needed. HSTP already running top of the internet. We have just now achieved to explain the protocol over protocols on heterogeneous networks. That's why do not compare with web2, web3 or vice versa.


## Abstract

HSTP is a application representation interface for [heterogeneous networks](https://en.wikipedia.org/wiki/Heterogeneous_network).

HSTP interface enforces to implement a set of methods to be able to communicate with other nodes in the network.

### What is a HSTP?

HSTP is a interface, which is a set of methods that must be implemented by the application layer. The interface is used to communicate with other nodes in the network. The interface is designed to be used in a [heterogeneous network](https://en.wikipedia.org/wiki/Heterogeneous_network).


### What is a HSTP node?

HSTP shall be implemented on any layer of network connected devices/environment.

HSTP node could be a TCP server, HTTP server, static file or contract in any chain.
One HSTP node is able to call any other HSTP node.
Thus the nodes can call each other freely, they can check their system status, and they can communicate with each other.

### What kind of abstraction layer for networks?

HSTP is already implemented on language level, by people for people.
English is mostly adopted language around the Earth. JavaScript could be known also mostly adopted language for browser environments. Solidity is for EVM-based chains, hyperbees for TCP based networks, etc.

HSTP interface shall be applied between any HSTP connected devices/networks.

- [Universe] talks to [Universe] via [HSTP]
    - [Kind] universe talks over world.
        - [World] Earth talks with sound frequencies and *HSTP*.
            - [Country] X sound frequencies on Xish and *HSTP*.
                - [Community] CommunityX Xish on CommunityXish.
            - [Country] Y talks Yish and *HSTP*.
            - [Country] Z talks Zish and *HSTP*.
        - [World] Mars talks with radio frequencies.
            - [Bacteria] UUU-1 talks UUU-1ish and *HSTP*.
                - **Info:** UUU-1 can call, **universe/kind/world/Earth/X/CommunityX/query**
        - [World] Jupiter talks with light frequencies and do not implements HSTP.
            - **Info:** If the Earth wants to talk with Jupiter, we can add one HSTP to Jupiter proxy on universe.
    - [Kind] universe talks over atoms and *HSTP*.
        - [Atoms] ... and *HSTP*.
            - [X] ... and *HSTP*.
                - [Y] ... and *HSTP*.
                    - **Info:** [Y] can talk with **universe/kind/world/Mars/Bacteria/UUU-1/query**
        - [Atoms] ... and *HSTP*.
            - [X] ... and *HSTP*.
                - [Y] ... and *HSTP*.
                    - **Info:** [Y] can talk with **universe/kind/world/Mars/Bacteria/UUU-1/query**
        **Info:** Kind universe can talk with Mars, and Mars also can talk with Kind universe.

### What is the purpose of HSTP?


**Infinitive scaling options:**
Any TCP connected device can talk with any other TCP connected device over HSTP. That means any web browser is serve of another HSTP node, and any web browser can call any other web browser.

**Uniform application representation interface:**
HSTP is a uniform interface, which is a set of methods that must be implemented by the application layer. 

**Heterogeneous networks:**
Any participant of network is allowing to share the resources with other participants of the network. The resources can be CPU, memory, storage, network, etc.

**Conjucation of web versions**
Since the blockchain technologies calling as web3, people started discussing about the differanciates between the web's. Comparing is a behaviour for incremental numeric system education's mindset. Which one is better: none of them. We have to build systems could talk in one uniform protocol, underneath services could be anything. HSTP is aiming for that.

### What are the components of HSTP?

**Registry interface**
Registry interface designed for using on TCP layer, to be able to register top level tld nodes in the network. The first implementation of HSTP TCP relay will resolve **hstp/**

The registry has two parts of the interface:
- **Register** method, which is used to register a new node in the network.
- **Resolve** method, which is used to resolve a node in the network.

Registry implementation needs two HSTP node,
1) Hyperbees
 - Heterogen networks will resolve the registry of RPC, TCP, HTTP, HSTP etc.
2) Registry.sol on any EVM based chain. (Ethereum, Binance Smart Chain, Polygon, etc.)
 - Registry.sol will resolve the registry of HSTP nodes. That can be relayed over another networks.

**Router interface**

For demonstration purposes, we will use the following solidity example:

```solidity
// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./HSTP.sol";
import "./ERC165.sol";

enum Operation {
    Query,
    Mutation
}

struct Response {
    uint256 status;
    string body;
}

struct Registry {
    HSTP resolver;
}

// HSTP/Router.sol
abstract contract Router is ERC165 {
    event Log(address indexed sender, Operation operation, bytes payload);
    event Register(address indexed sender, Registry registry);
    mapping(string => Registry) public routes;

    function reply(string memory name, Operation _operation, bytes memory payload) public virtual payable returns(Response memory response) {
        emit Log(msg.sender, _operation, payload);
        // Traverse upwards and downwards of the tree.
        // Tries to find the closest path for given operation.
        // If the route is registered on HSTP node, reply from children node.
        // If the node do not have the route on this node, ask for parent.
        if (routes[name]) {
            if (_operation == Operation.Query) {
                return this.query(payload);
            } else if (_operation == Operation.Mutation) {
                return this.mutation(payload);
            }
        }
        return super.reply(name, _operation, payload);
    }

    function query(string memory name, bytes memory payload) public view returns (Response memory) {
        return routes[name].resolver.query(payload);
    }

    function mutation(string memory name, bytes memory payload) public payable returns (Response memory) {
        return routes[name].resolver.mutation(payload);
    }

    function register(string memory name, HSTP node) public {
        Registry memory registry = Registry({
            resolver: node
        });
        emit Register(msg.sender, registry);
        routes[name] = registry;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(HSTP).interfaceId;
    }
}

```

**HSTP interface**

```solidity
// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./Router.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
// Will implement: EIP-4337 when it's on final stage.
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-4337.md
abstract contract HSTP is Router {
    constructor(string memory name) {
        register(name, this);
    }

    function query(bytes memory payload)
        public
        view
        virtual
        returns (Response memory);

    function mutation(bytes memory payload)
        public
        payable
        virtual
        returns (Response memory);
}
```

**Example HSTP Node**

HSTP node has access to call parent router by super.reply(name, operation, payload) method. HSTP node can also call children nodes by calling this.query(payload) or this.mutation(payload) methods.

A HSTP node can be a smart contract, or a web browser, or a TCP connected device.

Node has full capability of adding more HSTP nodes to the network or itself as sub services.

```text
      HSTP  HSTP
    /    \   /  \
  HSTP   HSTP  HSTP
        /    \
      HSTP  HSTP
    /       /
    HSTP   HSTP
```

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hstp/HSTP.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Todo is HSTP("Todo") {

    struct ITodo {
        string todo;
    }
    
    function addTodo(ITodo memory request) public payable returns(Response memory response) {
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
            (ITodo memory request) = abi.decode(payload, (ITodo));
            return this.addTodo(request);
        }
}
```

### Proposal

Ethereum proposal is draft now, but the protocol has referance implementation [Todo.sol](./examples/Chain/Todo/Todo.sol).

### Awesome web services running top of HSTP

[Full list here](https://github.com/cagataycali/awesome-web3-services)


### Hello world

[You can test the HSTP and try on remix now.](https://gist.github.com/cagataycali/947039f7c8d066957b3652b638085f49)

### How to play with the protocol?

- Copy the source code below to the https://remix.ethereum.org/
- Deploy on any EVM based chain.
- Call the functions and try different network topologies on HSTP.


```solidity
// SPDX-License-Identifier: UNLICENSED
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

- [ ] Implement TCP layer HSTP interface on hyperbees, [Universe]
    - hyperbees and HSTP will be the first implementation of HSTP.
    - That will covers the universe phrase of networks. That will bring us full decentralized web on HSTP.
- [x] Implement RPC layer HSTP interface on Solidity [Web3]
    - [Solidity - HSTP Node example](./examples/Chain/Todo/Todo.sol)
- [x] Implement complex serviceless architecture on HSTP interface with Solidity [Web3]
    - [Solidity - CoolBook](./examples/Chain/CoolBook/CoolBook.sol) (Pseudo serviceless architecture)
- [ ] Implement HTTP layer HSTP interface on JavaScript [Web]
    - HSTP interfaces are close to the POC state. [HTML - HSTP Node example](./examples/HTTP/Todo.html)

### Inspirations:

- [x] Applicability of the Babel Routing Protocol https://datatracker.ietf.org/doc/rfc8965/
- [x] EIP: The Extended Internet Protocol A Framework for Maintaining Backward Compatibility - https://datatracker.ietf.org/doc/html/rfc1385
- [x] Mindset [Humanode](https://humanode.io/)
  - *Why it's not a Humanode:* They are so high level for this abstraction, yet but the correct path is HSTP.
- [x] Solidity level abstraction for Hyper Service Transfer Protocol ([Diamond protocol eip-2535](https://eips.ethereum.org/EIPS/eip-2535))
  - [x] *Why it's not a diamond:* https://blog.trailofbits.com/2020/10/30/good-idea-bad-design-how-the-diamond-standard-falls-short/
- [x] TCP level abstraction for Hyper Service Transfer Protocol ([libp2p](https://libp2p.io/))
    - Application representation layer is missing.
 - [x] *Why it's not a libp2p:* There's no application representation layer. It's just a network layer.
- [x] TCP layer abstraction approach: https://datatracker.ietf.org/doc/html/rfc1347
  - [x] *Why it's not a RFC1347:* It's not a standard, it's just a proposal. Application representation layer is missing.
# License

GNU GENERAL PUBLIC LICENSE V3

# Core Contributors

- [Cagatay Cali](https://twitter.com/cagataycali)
- [Buğra Yıldız](https://twitter.com/mby)
- [Erdal Çay](https://twitter.com/erdalcay)
# Author

[Cagatay Cali](https://twitter.com/cagataycali)
