// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Stateless Hyper Service Transfer Protocol for on-chain services.
import "./HSTP.sol";

contract Node is HSTP {
    string[] public todos;

    function query(string[] memory request)
        public
        view
        override
        virtual
        returns (Response memory)
    {
    }

    function mutation(string[] memory request)
        public
        virtual
        override
        payable
        returns (Response memory)
    {
        Response memory response;
        response.status = 200;
        this.addTodo(request);
        response.body = "";
        return response;
    }

    function addTodo(string[] memory payload) public {
        require(payload.length == 1, "length must be 1");
        todos.push(payload[0]);
    }
}