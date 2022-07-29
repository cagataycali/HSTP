// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Stateless Hyper Service Transfer Protocol for on-chain services.
import "./HSTP.sol";

contract Node is HSTP {
   string[] public todos;
    function query(Request memory request, Response memory response)
        public
        override
        virtual
        returns (Response memory) {
            response.status = request.payload;
            response.body = todos[0];
            return response;
        }

    function mutation(Request memory request, Response memory response)
        public
        virtual
        override
        payable
        returns (Response memory) {
            response.status = "success";
            this.addTodo(request.payload);
            response.body = request.payload;
            return response;
        }

    function addTodo(string memory todo) public {
        todos.push(todo);
    }
}