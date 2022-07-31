// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./HSTP.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

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
    mapping(string => Registry) public routes;

    struct Registry {
        HSTP resolver;
    }

    function reply(string memory name, Operation _operation, bytes memory payload) public virtual payable returns(Response memory response) {
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
        routes[name] = Registry({
            resolver: node
        });
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(HSTP).interfaceId;
    }
}