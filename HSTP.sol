// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

enum Operation {
    Invalid,
    Query,
    Mutation,
    Router
}

struct Registry {
    Operation operation;
    HSTP resolver;
}

struct Response {
    uint8 status;
    string body;
}

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract HSTP {
    mapping(string => Registry) private routes;
    constructor(string memory name, Operation operation) {
        routes[name] = Registry({
            resolver: this,
            operation: operation
        });
    }

    function reply(string[] memory payload) public payable returns (Response memory response) {
        // ['addTodo', ...params]
        // If the HSTP node has a route for the payload, then call the resolver.
        string memory name = payload[0];
        if (routes[name].operation != Operation(0)) {
            if (routes[name].operation == Operation.Query) {
                return routes[name].resolver.query(name, payload);
            } else if (routes[name].operation == Operation.Mutation) {
                return routes[name].resolver.mutation(name, payload);
            }
        }
    }

    function register(string memory name, HSTP node, Operation operation) public {
        routes[name] = Registry({
            resolver: node,
            operation: operation
        });
    }

    function query(string memory name, string[] memory payload) public view returns (Response memory) {
        return routes[name].resolver.query(name, payload);
    }

    function mutation(string memory name, string[] memory payload) public payable returns (Response memory) {
        return routes[name].resolver.mutation(name, payload);
    }
}