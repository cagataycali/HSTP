// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./HSTP.sol";

enum Operation {
    Query,
    Mutation
}

struct Response {
    uint8 status;
    string body;
}

// Stateless Hyper Service Transfer Protocol for on-chain services.
abstract contract Router {
    mapping(string => Registry) private routes;

    struct Registry {
        Operation operation;
        HSTP resolver;
    }

    // CC: I do not think the reply function is going to be adopted from community.
    // function reply(string memory name, string[] memory payload) public virtual payable returns(Response memory response) {
    //     if (routes[name].operation == Operation.Query) {
    //         response = this.query(name, payload);
    //     } else if (routes[name].operation == Operation.Mutation) {
    //         response = this.mutation(name, payload);
    //     }
    //     return response;
    // }

    function query(string memory name, string[] memory payload) public view returns (Response memory) {
        require(routes[name].operation == Operation.Query, "method not allowed");
        return routes[name].resolver.query(payload);
    }

    function mutation(string memory name, string[] memory payload) public payable returns (Response memory) {
        require(routes[name].operation == Operation.Mutation, "method not allowed");
        return routes[name].resolver.mutation(payload);
    }

    function register(string memory name, HSTP node, Operation operation) public {
        require(operation == Operation.Query || operation == Operation.Mutation, "invalid operation");
        routes[name] = Registry({
            resolver: node,
            operation: operation
        });
    }
}