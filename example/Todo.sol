// SPDX-License-Identifier: GNU-3.0-or-later
pragma solidity ^0.8.0;

import "https://github.com/cagataycali/HSTP/blob/main/HSTP.sol";

// Stateless Hyper Service Transfer Protocol for on-chain services.
contract Todo is HSTP("Todo") {
    
    function addTodo(string[] memory request) public payable returns(Response memory response) {
        response.body = request[0];
        return response;
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
        returns (Response memory) {
            return this.addTodo(request);
        }
}