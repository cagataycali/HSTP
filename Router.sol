// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./HSTP.sol";
import "./Structs.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Router {
    // {name: {contract: 'address', operation: 'query'}}

    // addTodo: {contract: 0x171, operation: 'mutation'}
    // getTodo: {contract: 0x171, operation: 'query'}
    struct Registry {
        HSTP resolver;
        uint256 operation;
    }
    mapping(string => Registry) public routes;
    
    function reply(string memory name, string memory payload) public payable virtual returns(Response memory) {
        Request memory request;
        request.payload = payload;
        Response memory response;
        if (routes[name].operation == 1) { // Query
            response = routes[name].resolver.query(request, response);
        } else {
            response = routes[name].resolver.mutation(request, response);
        }
        return response;
    }

    function register(string memory name, HSTP node, uint256 operation) public {
        routes[name] = Registry({
            resolver: node,
            operation: operation 
        });
    } 
}
