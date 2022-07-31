// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./HSTP.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

// Polygon'da deploy olmus bir node
// AWS tcp request'ini alip ustune polygon'a registry soruyor.
// Sonra ilgili blockchain ve node'a istek atiyor.
// Tum protocol HSTP.

// frontend req.

// Registry
struct World {
    string name;
    uint256 networkType; // 0 -> RPC, 1 -> HTTP, 2
    address node;
    address router;
}

enum Operation {
    Query,
    Mutation
}

struct Response {
    uint8 status;
    string body;
}

// Stateless Hyper Service Transfer Protocol for on-chain services.
abstract contract Router is ERC165 {
    event Log(address indexed sender, Operation operation, bytes payload);
    event Register(address indexed sender, Registry registry);
    mapping(string => Registry) public routes;

    struct Registry {
        HSTP resolver;
    }

    function reply(string memory name, Operation _operation, bytes memory payload) public virtual payable returns(Response memory response) {
        emit Log(msg.sender, _operation, payload);
        if (_operation == Operation.Query) {
            response = this.query(name, payload);
        } else if (_operation == Operation.Mutation) {
            response = this.mutation(name, payload);
        }
        return response;
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