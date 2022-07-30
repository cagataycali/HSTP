// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "./HSTP.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Todo is HSTP("addTodo", Operation.Mutation) {
    function addTodo(string[] memory request) public payable returns(string[] memory) {
        return request;
    }

    // Override for HSTP.
    function query(string[] memory request)
        public
        view
        virtual
        override
        returns (Response memory) {}

    function mutation(string[] memory request)
        public
        payable
        virtual
        override
        returns (Response memory) {}
}