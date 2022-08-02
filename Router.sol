// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./HSTP.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

// Polygon'da deploy olmus bir node
// AWS tcp request'ini alip ustune polygon'a registry soruyor.
// Sonra ilgili blockchain ve node'a istek atiyor.
// Tum protocol HSTP.

enum Operation {
    Query,
    Mutation
}

struct Response {
    uint8 status;
    string body;
}

struct Registry {
    HSTP resolver;
}

// Stateless Hyper Service Transfer Protocol for on-chain services.
abstract contract Router is ERC165 {
    event Log(address indexed sender, Operation operation, bytes payload);
    event Register(address indexed sender, Registry registry);
    mapping(string => Registry) public routes;

    function reply(string memory name, Operation _operation, bytes memory payload) public virtual payable returns(Response memory response) {
        emit Log(msg.sender, _operation, payload);
        // Traverse the tree.
        // If the route is registered on me, then I will handle it.
        // If I do not have the route on this node, ask for parent.
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