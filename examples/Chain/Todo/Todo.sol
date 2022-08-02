// SPDX-License-Identifier: GNU-3.0-or-later
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