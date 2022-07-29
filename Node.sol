// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Stateless Hyper Service Transfer Protocol for on-chain services.
import "./HSTP.sol";

contract Node is HSTP("addTodo") {
    function query(Request memory request, Response memory response)
        public
        override
        virtual
        returns (Response memory) {
            request.payload = "1";
            response.status = "1";
            response.body = "success";
            return response;
        }

    function mutation(Request memory request, Response memory response)
        public
        virtual
        override
        payable
        returns (Response memory) {
            request.payload = "test";
            response.status = "1";
            response.body = "success";
            return response;
        }
}