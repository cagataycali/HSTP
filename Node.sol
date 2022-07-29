// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Stateless Hyper Service Transfer Protocol for on-chain services.
import "./HSTP.sol";

contract Node is HSTP {
   function setServiceName (string memory name) public {
      register(name);
   }
    function query(Request memory request, Response memory response)
        public
        override
        virtual
        returns (Response memory) {
            response.status = "success";
            response.body = request.payload;
            return response;
        }

    function mutation(Request memory request, Response memory response)
        public
        virtual
        override
        payable
        returns (Response memory) {
            response.status = "success";
            response.body = request.payload;
            return response;
        }
}